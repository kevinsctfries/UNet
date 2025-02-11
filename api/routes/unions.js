import express from "express";
import {
  getUnion,
  createUnion,
  updateUnionImage,
} from "../controllers/unions.js";

const router = express.Router();

router.get("/:slug", getUnion);
router.post("/", createUnion);
router.put("/:id/image", updateUnionImage);

export default router;
