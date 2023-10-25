import mongoose from "mongoose";
import { Category } from "../../models/category.model";
import { Post } from "../../models/post.model";
import createServer from "../../server";
import supertest from "supertest";

const app = createServer();

const request = supertest(app);

process.env.API_KEY = 'api_key';

const categoryPayload = {
    name: "Test Category",
};

const postPayload = {
    title: "Test Post",
    content: "Test Content",
};

describe("POST /api/posts", () => {
    it("should create a post", async () => {
        const category = await Category.create(categoryPayload);
    
        const post = { ...postPayload, category_id: category._id}
        const response = await request.post("/api/posts").set({"api-key": process.env.API_KEY}).send(post);

        expect(response.status).toEqual(201);
        expect(response.body.post.title).toEqual(postPayload.title);
        expect(response.body.post.content).toEqual(postPayload.content);
        expect(response.body.post.category_id).toEqual(category._id.toString());
    });

    it("should return 400 if title is invalid", async () => {
        const category = await Category.create(categoryPayload);
    
        const post = { ...postPayload, title: "", category_id: category._id}
        const response = await request.post("/api/posts").set({"api-key": process.env.API_KEY}).send(post);

        expect(response.status).toEqual(400);
    });

    it("should return 400 if content is invalid", async () => {
        const category = await Category.create(categoryPayload);
    
        const post = { ...postPayload, content: "", category_id: category._id}
        const response = await request.post("/api/posts").set({"api-key": process.env.API_KEY}).send(post);

        expect(response.status).toEqual(400);
    });

    it("should return 400 if category_id is invalid", async () => {
        const post = { ...postPayload, category_id: "invalid"}
        const response = await request.post("/api/posts").set({"api-key": process.env.API_KEY}).send(post);

        expect(response.status).toEqual(400);
    });

});


describe("GET /api/posts", () => {
    it("should return all posts", async () => {
        const category = await Category.create(categoryPayload);
        const post = await Post.create({ ...postPayload, category_id: category._id});

        const response = await request.get("/api/posts").set({"api-key": process.env.API_KEY});

        expect(response.status).toEqual(200);
        expect(response.body.posts.length).toEqual(1);
    });
});


describe("GET /api/posts/:id", () => {

    it("should return 400 if id is invalid", async () => {
        const response = await request.get("/api/posts/invalid").set({"api-key": process.env.API_KEY});

        expect(response.status).toEqual(400);
    });

    it("should return 400 if post is not found", async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
        const response = await request.get(`/api/posts/${id}`).set({"api-key": process.env.API_KEY});

        expect(response.status).toEqual(400);
    });

    it("should return a post", async () => {
        const category = await Category.create(categoryPayload);
    
        const post = await Post.create({ ...postPayload, category_id: category._id});

        const response = await request.get(`/api/posts/${post._id}`).set({"api-key": process.env.API_KEY});

        expect(response.status).toEqual(200);
        expect(response.body.post.title).toEqual(postPayload.title);
        expect(response.body.post.content).toEqual(postPayload.content);
        expect(response.body.post.category_id).toEqual(category._id.toString());
    });
});


describe("PUT /api/posts/:id", () => {
    
    it("should return 400 if id is invalid", async () => {
        const response = await request.put("/api/posts/invalid").set({"api-key": process.env.API_KEY}).send(postPayload);

        expect(response.status).toEqual(400);
    });

    it("should return 400 if post is not found", async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
        const response = await request.put(`/api/posts/${id}`).set({"api-key": process.env.API_KEY}).send(postPayload);

        expect(response.status).toEqual(400);
    });

    it("should return 400 if title is invalid", async () => {
        const category = await Category.create(categoryPayload);
    
        const post = await Post.create({ ...postPayload, category_id: category._id});

        const response = await request.put(`/api/posts/${post._id}`).set({"api-key": process.env.API_KEY}).send({ title: 0, content: "Updated Content"});

        expect(response.status).toEqual(400);
    });

    it("should return 400 if content is invalid", async () => {
        const category = await Category.create(categoryPayload);
    
        const post = await Post.create({ ...postPayload, category_id: category._id});

        const response = await request.put(`/api/posts/${post._id}`).set({"api-key": process.env.API_KEY}).send({ title: "Updated Title", content: 0});

        expect(response.status).toEqual(400);
    });

    it("should update a post", async () => {
        const category = await Category.create(categoryPayload);
    
        const post = await Post.create({ ...postPayload, category_id: category._id});

        const response = await request.put(`/api/posts/${post._id}`).set({"api-key": process.env.API_KEY}).send({ title: "Updated Title", content: "Updated Content"});

        expect(response.status).toEqual(200);
        expect(response.body.post.title).toEqual("Updated Title");
        expect(response.body.post.content).toEqual("Updated Content");
        expect(response.body.post.category_id).toEqual(category._id.toString());
    });
});


describe("DELETE /api/posts/:id", () => {
        
    it("should return 400 if id is invalid", async () => {
        const response = await request.delete("/api/posts/invalid").set({"api-key": process.env.API_KEY});

        expect(response.status).toEqual(400);
    });

    it("should return 400 if post is not found", async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
        const response = await request.delete(`/api/posts/${id}`).set({"api-key": process.env.API_KEY});

        expect(response.status).toEqual(400);
    });

    it("should delete a post", async () => {
        const category = await Category.create(categoryPayload);
    
        const post = await Post.create({ ...postPayload, category_id: category._id});

        const response = await request.delete(`/api/posts/${post._id}`).set({"api-key": process.env.API_KEY});

        expect(response.status).toEqual(200);
        expect(response.body.post.title).toEqual(postPayload.title);
        expect(response.body.post.content).toEqual(postPayload.content);
        expect(response.body.post.category_id).toEqual(category._id.toString());

        const posts = await Post.find({});
        expect(posts.length).toEqual(0);
    });
});


describe("GET /api/posts/latest", () => {
    it("should return latest posts", async () => {
        const category = await Category.create(categoryPayload);
        const category2 = await Category.create({ name: "Test Category 2"});

        const post = await Post.create({ ...postPayload, category_id: category._id});
        const post2 = await Post.create({ ...postPayload, title: "Test Post 2", category_id: category._id});
        const post3 = await Post.create({ ...postPayload, title: "Test Post 3", category_id: category2._id});
        const post4 = await Post.create({ ...postPayload, title: "Test Post 4", category_id: category2._id});

        const response = await request.get("/api/posts/latest").set({"api-key": process.env.API_KEY});

        expect(response.status).toEqual(200);
        expect(response.body.posts.length).toEqual(2);

        expect(response.body.posts[0].title).toEqual(post4.title);
        expect(response.body.posts[0].category._id).toEqual(category2._id.toString());

        expect(response.body.posts[1].title).toEqual(post2.title);
        expect(response.body.posts[1].category._id).toEqual(category._id.toString());
    });
});