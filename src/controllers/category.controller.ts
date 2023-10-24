import { Request, Response } from "express";
import { createCategory, getCategory } from "../services/category.services";
import log from "../utils/logger";

export const createCategoryHandler = async (req: Request, res: Response) => {
    try {
        const { category, error } = await createCategory(req.body);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info(`Category created successfully`);
        return res.status(201).json({ message: "Category created successfully", category });
    } catch (error: any) {
        log.error(error);
        res.status(400).json({ message: "Category creation failed" });
    }
}

export const getCategoryHandler = async (req: Request, res: Response) => {
    try {
        const { category, error } = await getCategory();
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info("Category fetched successfully");
        return res.status(200).json({ message: "Category fetched successfully", category });
    } catch (error: any) {
        log.error(error);
        res.status(400).json({ message: "Fetching category failed" });
    }
}