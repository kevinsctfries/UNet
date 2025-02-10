import express from "express";
import { getUnion, createUnion } from "../controllers/unions.js";

const router = express.Router();

router.get("/:slug", getUnion);
router.post("/", createUnion);

export default router;
