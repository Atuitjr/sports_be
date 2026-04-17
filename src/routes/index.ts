import { footballRoutes } from './football/index.ts';
const path = process.env.BASE_PATH || '/api';
console.log(`base path is ${path}`)

export const setRoutes = (app: any) => {
  app.use(`${path}/football`, footballRoutes);
  // Add more routes here as needed
}
