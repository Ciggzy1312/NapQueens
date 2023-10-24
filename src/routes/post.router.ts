import express from "express";
import { createPostHandler, getPostsHandler, getPostHandler, updatePostHandler } from "../controllers/post.controller";
import validate from "../middlewares/validateResources";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema";

const router = express.Router();

router.post("/api/posts", validate(createPostSchema), createPostHandler);

router.get("/api/posts", getPostsHandler);

router.get("/api/posts/:id", getPostHandler)

router.put("/api/posts/:id", validate(updatePostSchema), updatePostHandler)

export default router;