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

export const deletePost = async (id: string) => {
    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return { post: null, error: "Post not found" };
        }

        return { post, error: null };
    } catch (error: any) {
        log.error(error);
        return { error: "Deleting post failed" };
    }
}

export const getLatestPosts = async () => {
    try {
        const latestPosts = await Post.aggregate([
            { $sort: { createdAt: -1 } },
            { $group: { _id: "$category_id", post: { $first: "$$ROOT" } } },
            { $replaceRoot: { newRoot: "$post" } },
            { $lookup: { from: "categories", localField: "category_id", foreignField: "_id", as: "category" } },
            { $unwind: "$category" },
            { $project: { "category_id": 0, "category.createdAt": 0, "category.updatedAt": 0 } },
            { $sort: { createdAt: -1 } },
        ]);

        return { latestPosts, error: null };
    } catch (error: any) {
        log.error(error);
        return { error: "Fetching latest posts failed" };
    }
};