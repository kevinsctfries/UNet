import express from "express";
import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../config/auth.js";

const router = express.Router();

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    const user = await verifyGoogleToken(token);

    // Generate JWT for session management
    const authToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token: authToken, user });
  } catch (error) {
    res.status(400).json({ error: "Authentication failed" });
  }
});

export default router;
