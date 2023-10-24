import mongoose from "mongoose";
import log from "./logger";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        log.info("Successfully connected to MongoDB database");
    } catch (error) {
        log.error("Error connecting to MongoDB database: ", error);
    }
}

export default connectDB;