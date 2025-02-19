import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUnion = (req, res) => {
  const { slug } = req.params;

  const q = `
    SELECT 
      u.*,
      JSON_OBJECT(
        'id', user.id,
        'username', user.username
      ) as owner
    FROM unions u 
    LEFT JOIN users user ON u.ownerId = user.id 
    WHERE u.slug = ?
    LIMIT 1`;

  db.query(q, [slug], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }

    console.log("Query results:", data);

    if (!data || data.length === 0) {
      return res.status(404).json("Union not found!");
    }

    const union = {
      ...data[0],
      owner: JSON.parse(data[0].owner),
    };

    return res.status(200).json(union);
  });
};

export const createUnion = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  try {
    // Add debug logging
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("Received token:", token);

    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified user info:", userInfo);

    const { name, desc, coverPic, profilePic } = req.body;

    // Create URL-friendly slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const q = `
      INSERT INTO unions (name, slug, \`desc\`, coverPic, profilePic, ownerId) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      q,
      [name, slug, desc, coverPic, profilePic, userInfo.id],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json(err);
        }
        return res.status(200).json({
          message: "Union created successfully!",
          slug: slug,
          id: result.insertId,
        });
      }
    );
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.error("JWT Error details:", {
        message: err.message,
        token: token?.slice(0, 10) + "...", // Only log first 10 chars
        secret: process.env.JWT_SECRET?.slice(0, 5) + "...", // Only log first 5 chars
      });
      return res.status(401).json("Invalid authentication token");
    }
    console.error("Error creating union:", err);
    return res.status(500).json(err.message);
  }
};

export const updateUnionImage = async (req, res) => {
  const token = req.cookies.accessToken;
  console.log("UpdateUnionImage - Received request:", {
    token: token ? token.slice(0, 15) + "..." : "no token",
    secret: process.env.JWT_SECRET.slice(0, 15) + "...",
  });

  if (!token) return res.status(401).json("Not logged in!");

  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = req.params;
    const { type, imageUrl } = req.body;

    if (!type || !imageUrl) {
      return res.status(400).json("Missing required fields");
    }

    const column = type === "cover" ? "coverPic" : "profilePic";

    const q = `UPDATE unions SET ${column} = ? WHERE id = ? AND ownerId = ?`;

    db.query(q, [imageUrl, id, userInfo.id], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json(err);
      }
      if (result.affectedRows === 0) {
        return res.status(403).json("Not authorized to update this union");
      }
      return res.status(200).json("Image updated successfully");
    });
  } catch (err) {
    console.error("UpdateUnionImage - JWT Error:", {
      message: err.message,
      type: err.constructor.name,
    });
    return res.status(401).json("Authentication failed");
  }
};
