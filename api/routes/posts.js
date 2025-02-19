import express from "express";
import { getPosts, getPost, createPost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost); // Add this new route
router.post("/", createPost);

export default router;
