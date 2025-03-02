import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { unionSlug } = req.query; // Change from unionId to unionSlug

  const q = `
    SELECT p.*, u.id AS userId, u.name, u.profilePic,
           un.name as unionName, un.slug as unionSlug
    FROM posts AS p 
    JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN unions un ON (un.id = p.unionId)
    ${unionSlug ? "WHERE un.slug = ?" : ""}
    ORDER BY p.createdAt DESC
  `;

  const params = unionSlug ? [unionSlug] : [];

  db.query(q, params, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    // Transform the data to match the expected format
    const posts = data.map(post => ({
      ...post,
      union: post.unionName
        ? {
            name: post.unionName,
            slug: post.unionSlug,
          }
        : undefined,
    }));
    return res.status(200).json(posts);
  });
};

export const getPost = (req, res) => {
  const { id } = req.params;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const q = `
    SELECT p.*, u.id AS userId, u.name, u.profilePic,
           un.name as unionName, un.slug as unionSlug
    FROM posts AS p 
    JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN unions un ON (un.id = p.unionId)
    WHERE p.id = ?
  `;

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Post not found");

    const post = {
      ...data[0],
      union: data[0].unionName
        ? {
            name: data[0].unionName,
            slug: data[0].unionSlug,
          }
        : undefined,
    };

    return res.status(200).json(post);
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
