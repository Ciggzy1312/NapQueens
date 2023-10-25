import { NextFunction, Request, Response } from "express";
import log from "../utils/logger";

const validKey = (key: string) => {
    // Check the database for the key alloted to the user
    // For now, we'll just check the key against the environment variable as there is no user
    return key === process.env.API_KEY;
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKey = req.headers["api-key"];
        if (!validKey(apiKey as string)) {
            return res.status(401).json({ message: "Invalid API key" });
        }
        
        next();
    } catch (error) {
        log.error(error);
        return res.status(401).json({ message: "Error validating token" });
    }
};

export default authMiddleware;