import * as dotenv from 'dotenv';
dotenv.config();
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// The module system ensures this instance is a singleton

const COMMON_HEADER_NAME = process.env.API_HEADER_NAME;
const FOOTBALL_API_KEY = process.env.API_SECRET_KEY;

const headers = COMMON_HEADER_NAME && FOOTBALL_API_KEY
  ? { [COMMON_HEADER_NAME]: FOOTBALL_API_KEY }
  : {};

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.FOOTBALL_API_BASE_URL || '',
  headers,
  timeout: 5000,
});

// Type-safe Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(`axios call made to ${config.url}`)
    // const token = process.env.SERVICE_TOKEN;
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

