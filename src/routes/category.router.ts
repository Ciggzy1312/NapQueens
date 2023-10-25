import express from "express";
import { createCategoryHandler, getCategoryHandler } from "../controllers/category.controller";
import validate from "../middlewares/validateResources";
import { createCategorySchema } from "../schemas/category.schema";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/api/category", authMiddleware, validate(createCategorySchema), createCategoryHandler);

router.get("/api/category", authMiddleware, getCategoryHandler);

export default router;