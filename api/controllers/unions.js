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

export const createUnion = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { name, slug, desc } = req.body;

    const q = `
        INSERT INTO unions (name, slug, \`desc\`, ownerId) 
        VALUES (?, ?, ?, ?)`;

    db.query(q, [name, slug, desc, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Union created successfully!");
    });
  });
};

export const updateUnionImage = async (req, res) => {
  const token = req.cookies.accessToken;
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
    console.error("Error updating union image:", err);
    return res.status(500).json(err.message);
  }
};
