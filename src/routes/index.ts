import express from "express";
import postRouter from "./post.router";
import categoryRouter from "./category.router";

const router = express.Router();

router.use(postRouter);
router.use(categoryRouter);

export default router;