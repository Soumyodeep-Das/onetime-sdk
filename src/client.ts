// src/client.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  OnetimeClientError,
  OnetimeServerError,
  OnetimeNetworkError,
} from './errors';

type InitOptions = {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
};

let client: AxiosInstance;

export const initClient = ({
  apiKey,
  baseURL = 'https://api.onetime.dev',
  timeout = 5000,
  retries = 2,
}: InitOptions) => {
  client = axios.create({
    baseURL,
    timeout,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  // Interceptor: Retry failed requests
  client.interceptors.response.use(undefined, async (error: AxiosError) => {
    const config = error.config as any;
    if (!config || !config.retryCount) config.retryCount = 0;

    const shouldRetry =
      error.code === 'ECONNABORTED' ||
      error.message.includes('timeout') ||
      (typeof error.response?.status === 'number' && error.response.status >= 500);

    if (shouldRetry && config.retryCount < retries) {
      config.retryCount += 1;
      await new Promise(res => setTimeout(res, 2 ** config.retryCount * 100)); // Exponential backoff
      return client(config);
    }

    // Handle known errors
    if (error.response) {
      const data = error.response.data as { message?: string } | undefined;
      if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
        throw new OnetimeClientError(data?.message || 'Client Error', error.response.status);
      }
      if (error.response?.status && error.response.status >= 500) {
        throw new OnetimeServerError(data?.message || 'Server Error', error.response.status);
      }
    }

    // Network error or timeout
    throw new OnetimeNetworkError(error.message || 'Network Error');
  });

  return client;
};

export const getClient = () => {
  if (!client) throw new Error('OneTime SDK not initialized. Call initOTPClient() first.');
  return client;
};
