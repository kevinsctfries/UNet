import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error("Invalid Token");

    // Check if user exists, otherwise create one
    let user = await User.findOne({ googleId: payload.sub });
    if (!user) {
      user = new User({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
      });
      await user.save();
    }

    return user;
  } catch (error) {
    console.error("Google token verification failed:", error);
    throw new Error("Invalid token");
  }
};
