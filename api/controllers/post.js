import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { unionId } = req.query;

  const q = `
    SELECT p.*, u.id AS userId, name, profilePic 
    FROM posts AS p 
    JOIN users AS u ON (u.id = p.userId)
    ${unionId ? "WHERE p.unionId = ?" : ""}
    ORDER BY p.createdAt DESC
  `;

  const params = unionId ? [unionId] : [];

  db.query(q, params, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const createPost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not logged in!");
  }

  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);

    const { desc, unionId } = req.body;

    // Format date in MySQL format: YYYY-MM-DD HH:MM:SS
    const now = new Date();
    const mysqlDate = now.toISOString().slice(0, 19).replace("T", " ");

    const q = `
      INSERT INTO posts (\`desc\`, userId, unionId, createdAt) 
      VALUES (?, ?, ?, ?)
    `;

    const values = [desc, userInfo.id, unionId, mysqlDate];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json("Post created successfully!");
    });
  } catch (err) {
    return res.status(403).json("Token is not valid!");
  }
};
