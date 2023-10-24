import { Request, Response } from "express";
import { createPost } from "../services/post.services";
import log from "../utils/logger";

export const createPostHandler = async (req: Request, res: Response) => {
    try {
        const { post, error } = await createPost(req.body);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info(`Post created successfully`);
        return res.status(201).json({ message: "Post created successfully", post });
    } catch (error: any) {
        log.error(error);
        res.status(400).json({ message: "Post creation failed" });
    }
}