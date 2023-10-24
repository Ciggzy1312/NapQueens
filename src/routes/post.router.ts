import express from "express";
import { createPostHandler, getPostsHandler } from "../controllers/post.controller";
import validate from "../middlewares/validateResources";
import { createPostSchema } from "../schemas/post.schema";

const router = express.Router();

router.post("/api/posts", validate(createPostSchema), createPostHandler);

router.get("/api/posts", getPostsHandler);

export default router;