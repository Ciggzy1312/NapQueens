import express from "express";
import postRouter from "./post.router";

const router = express.Router();

router.use(postRouter);

export default router;