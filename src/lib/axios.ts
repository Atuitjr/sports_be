import * as dotenv from 'dotenv';
dotenv.config();
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { logger } from './logger.js';

const COMMON_HEADER_NAME = process.env.API_HEADER_NAME;
const FOOTBALL_API_KEY = process.env.API_SECRET_KEY;

const headers = COMMON_HEADER_NAME && FOOTBALL_API_KEY
  ? { [COMMON_HEADER_NAME]: FOOTBALL_API_KEY }
  : {};

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.FOOTBALL_API_BASE_URL ?? '',
  headers,
  timeout: Number(process.env.API_TIMEOUT ?? 5000),
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    logger.debug(`Outgoing request`, { url: config.url, method: config.method });
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

export default apiClient;
