import { Request, Response } from "express";
import { createPost, getPosts } from "../services/post.services";
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

export const getPostsHandler = async (req: Request, res: Response) => {
    try {
        const { posts, error } = await getPosts();
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info("Post fetched successfully");
        return res.status(200).json({ message: "Post fetched successfully", posts });
    } catch (error: any) {
        log.error(error);
        res.status(400).json({ message: "Fetching posts failed" });
    }
}