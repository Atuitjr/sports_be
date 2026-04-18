import app from './app.js';
import { logger } from './lib/logger.js';

const PORT = process.env.PORT ?? 3000;

const server = app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});

const shutdown = (): void => {
    logger.info('Shutdown signal received, closing server...');
    server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
