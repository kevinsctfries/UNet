import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUnion = (req, res) => {
  const { slug } = req.params;

  const q = `
    SELECT u.*, 
           user.username as ownerUsername,
           user.name as ownerName 
    FROM unions u 
    JOIN users user ON u.ownerId = user.id 
    WHERE u.slug = ?`;

  db.query(q, [slug], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Union not found!");
    return res.status(200).json(data[0]);
  });
};

export const createUnion = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { name, slug, description } = req.body;

    const q = `
        INSERT INTO unions (name, slug, desc, ownerId) 
        VALUES (?, ?, ?, ?)`;

    db.query(q, [name, slug, desc, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Union created successfully!");
    });
  });
};
