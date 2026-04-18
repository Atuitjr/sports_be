type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const LEVELS: Record<LogLevel, number> = { error: 0, warn: 1, info: 2, debug: 3 };

const currentLevel = (): LogLevel => {
  const env = process.env.LOG_LEVEL?.toLowerCase();
  return env !== undefined && env in LEVELS ? (env as LogLevel) : 'info';
};

const log = (level: LogLevel, message: string, meta?: unknown): void => {
  if (LEVELS[level] > LEVELS[currentLevel()]) return;
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(meta !== undefined && { meta }),
  });
  if (level === 'error' || level === 'warn') {
    console.error(entry);
  } else {
    console.log(entry);
  }
};

export const logger = {
  error: (message: string, meta?: unknown) => log('error', message, meta),
  warn: (message: string, meta?: unknown) => log('warn', message, meta),
  info: (message: string, meta?: unknown) => log('info', message, meta),
  debug: (message: string, meta?: unknown) => log('debug', message, meta),
};
