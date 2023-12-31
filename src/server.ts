import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes';

function createServer() {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());

    app.use(router);

    return app;
}

export default createServer;