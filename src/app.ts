import express, { type Application } from 'express';
import cors from 'cors';
import { setRoutes } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './lib/logger.js';

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, _res, next) => {
    logger.info('Incoming request', { method: req.method, url: req.url });
    next();
});

setRoutes(app);

app.use(errorHandler);

export default app;
