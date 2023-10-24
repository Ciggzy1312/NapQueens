import log from "../utils/logger";
import { CreatePostInput } from "../types/types";
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