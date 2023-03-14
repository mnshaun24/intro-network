import { Router } from "express";
import {
    getUser,
    getUserSavedPosts,
    saveDeleteSavedPosts,
    updateUserProfile,
    deleteUser
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

// READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/savedPosts", verifyToken, getUserSavedPosts);

// UPDATE
router.patch("/:id/:postId", verifyToken, saveDeleteSavedPosts);
router.put("/:id", verifyToken, updateUserProfile);

// DELETE
router.delete("/:id", deleteUser);

export default router;
