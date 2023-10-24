import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    }),
    content: z.string({
        required_error: "Content is required",
        invalid_type_error: "Content must be a string",
    }),
    category_id: z.string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
    }),
});

export const updatePostSchema = z.object({
    title: z.string({
        invalid_type_error: "Title must be a string",
    }).optional(),
    content: z.string({
        invalid_type_error: "Content must be a string",
    }).optional(),
})