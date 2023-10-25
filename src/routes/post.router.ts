import express from "express";
import { createPostHandler, getPostsHandler, getPostHandler, updatePostHandler, deletePostHandler, getLatestPostsHandler } from "../controllers/post.controller";
import validate from "../middlewares/validateResources";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/api/posts", authMiddleware, validate(createPostSchema), createPostHandler);

router.get("/api/posts", authMiddleware, getPostsHandler);

router.get("/api/posts/latest", authMiddleware, getLatestPostsHandler)

router.get("/api/posts/:id", authMiddleware, getPostHandler)

router.put("/api/posts/:id", authMiddleware, validate(updatePostSchema), updatePostHandler)

router.delete("/api/posts/:id", authMiddleware, deletePostHandler)

export default router;