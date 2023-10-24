import express from "express";
import { createPostHandler } from "../controllers/post.controller";
import validate from "../middlewares/validateResources";
import { createPostSchema } from "../schemas/post.schema";

const router = express.Router();

router.post("/api/posts", validate(createPostSchema), createPostHandler);

export default router;