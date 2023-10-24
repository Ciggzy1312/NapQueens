import log from "../utils/logger";
import { PostInput, CreatePostInput } from "../types/types";
import { Post } from "../models/post.model";

export const createPost = async (input: CreatePostInput) => {
    try {
        const post = await Post.create(input);

        return { post, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Post creation failed" };
    }
}

export const getPosts = async () => {
    try {
        const posts = await Post.find({});

        return { posts, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Fetching posts failed" }
    }
};

export const getPost = async (id: string) => {
    try {
        const post = await Post.findById(id);
        if (!post) {
            return { post: null, error: "Post not found" };
        }

        return { post, error: null };
    } catch (error: any) {
        log.error(error)
        return { error: "Fetching post failed" }
    }
};

export const updatePost = async (id: string, input: PostInput) => {
    try {
        const post = await Post.findByIdAndUpdate(id, input, { new: true });
        if (!post) {
            return { post: null, error: "Post not found" };
        }

        return { post, error: null };
    } catch (error: any) {
        log.error(error);
        return { error: "Updating post failed" };
    }
};