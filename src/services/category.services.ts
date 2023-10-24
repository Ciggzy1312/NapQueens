import log from "../utils/logger";
import { CreateCategoryInput } from "../types/types";
import { Category } from "../models/category.model";

export const createCategory = async (input: CreateCategoryInput) => {
    try {
        const category = await Category.create(input);

        return { category, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Category creation failed" };
    }
}

export const getCategory = async () => {
    try {
        const category = await Category.find({});

        return { category, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Fetching category failed" }
    }
};