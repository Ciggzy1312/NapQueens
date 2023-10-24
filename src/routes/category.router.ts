import express from "express";
import { createCategoryHandler, getCategoryHandler } from "../controllers/category.controller";
import validate from "../middlewares/validateResources";
import { createCategorySchema } from "../schemas/category.schema";

const router = express.Router();

router.post("/api/category", validate(createCategorySchema), createCategoryHandler);

router.get("/api/category", getCategoryHandler);

export default router;