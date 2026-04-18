import type { Application } from 'express';
import { footballRoutes } from './football/index.js';

const path = process.env.BASE_PATH ?? '/api';

export const setRoutes = (app: Application): void => {
    app.use(`${path}/football`, footballRoutes);
};
