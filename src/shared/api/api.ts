import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { enqueueSnackbar } from 'notistack';

interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}
const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;

api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers = config.headers || {};
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);
api.interceptors.response.use(
  response => response,
  async (errors: AxiosError) => {
    const status = errors.response?.status;
    const originalRequestConfig = errors.config!;
    enqueueSnackbar('Произошла ошибка', {
      variant: 'error',
    });
    if (status !== 401) return Promise.reject(errors);
    if (status === 401)
      return Promise.reject(errors);

    if (isTokenRefreshing)
      return new Promise((resolve, reject) => {
        failedRequests.push({
          config: originalRequestConfig,
          error: errors,
          reject,
          resolve,
        });
      });

    isTokenRefreshing = true;


    return api(originalRequestConfig);
  },
);

export const $api = api;
