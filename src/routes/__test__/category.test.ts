import { Category } from "../../models/category.model";
import createServer from "../../server";
import supertest from "supertest";

const app = createServer();

const request = supertest(app);

process.env.API_KEY = 'api_key';

const categoryPayload = {
    name: "Test Category",
};

describe("POST /api/category", () => {
    it("should create a category", async () => {
        const response = await request.post("/api/category").set({"api-key": process.env.API_KEY}).send(categoryPayload);

        expect(response.status).toEqual(201);
        expect(response.body.category.name).toEqual(categoryPayload.name);
    });

    it("should return 400 if name is invalid", async () => {
        const response = await request.post("/api/category").set({"api-key": process.env.API_KEY}).send({name: ""});

        expect(response.status).toEqual(400);
    });
});


describe("GET /api/category", () => {
    it("should return all categories", async () => {
        const category = await Category.create(categoryPayload);

        const response = await request.get("/api/category").set({"api-key": process.env.API_KEY});

        expect(response.status).toEqual(200);
        expect(response.body.category.length).toEqual(1);
    });
});