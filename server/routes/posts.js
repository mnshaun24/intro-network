import { Router } from "express";
import { getFeedPosts, getUserPosts, likePost, updatePostContent, deletePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// UPDATE
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id", verifyToken, updatePostContent);

// DELETE
router.delete("/:id", verifyToken, deletePost);

export default router;