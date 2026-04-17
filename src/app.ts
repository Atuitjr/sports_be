import express, { type Application } from 'express';
import { setRoutes } from './routes/index.ts';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));
app.use((req, _, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
  next(); // Essential to pass control to the next function
});

// Routes
setRoutes(app);

export default app;


/**
 * ! USAR ZOD PARA VALIDAR LOS SCHEMAS DE LAS REQUESTS Y RESPONSES
 * ! USAR LOGGER COMO WINSTON O PINO
 * ! MANEJO DE ERRORES CENTRALIZADO
 * ! USAR MIDDLEWARES DE SEGURIDAD COMO HELMET, CORS, RATE LIMITING
 * ! USAR INTERFACES Y TIPOS DE TYPESCRIPT PARA DEFINIR ESTRICTAMENTE LOS DATOS
 */