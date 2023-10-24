import express from 'express';
import cookieParser from 'cookie-parser';
import log from './utils/logger';
import connectDB from './utils/connect';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(8000, async () => {
    log.info('Server running on port 8000');
    await connectDB();
});