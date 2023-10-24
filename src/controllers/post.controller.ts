import { Request, Response } from "express";
import { createPost, getPosts, getPost, updatePost, deletePost } from "../services/post.services";
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

export const getPostHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { post, error } = await getPost(id);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info("Post fetched successfully");
        return res.status(200).json({ message: "Post fetched successfully", post });
    } catch (error: any) {
        log.error(error);
        res.status(400).json({ message: "Fetching post failed"})
    }
}

export const updatePostHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { post, error } = await updatePost(id, req.body);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info("Post updated successfully");
        return res.status(200).json({ message: "Post updated successfully", post });
    } catch (error: any) {
        log.error(error);
        res.status(400).json({ message: "Updating post failed" });
    }
}

export const deletePostHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { post, error } = await deletePost(id);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info("Post deleted successfully");
        return res.status(200).json({ message: "Post deleted successfully", post });
    } catch (error: any) {
        log.error(error);
        res.status(400).json({ message: "Deleting post failed" });
    }
};