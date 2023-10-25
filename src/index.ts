import createServer from './server';
import log from './utils/logger';
import connectDB from './utils/connect';
import dotenv from 'dotenv';
dotenv.config();

const app = createServer();

app.listen(8000, async () => {
    log.info('Server running on port 8000');
    await connectDB();
});