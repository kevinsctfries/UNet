import mongoose from "mongoose";

// MongoDB connection utility
const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Define the post schema
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create the Post model
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Connect to database
    await connectToDatabase();

    const { content } = req.body;

    // Create a new post in the database
    const newPost = new Post({ content });

    try {
      await newPost.save();
      res.status(201).json({ message: "Post created successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
