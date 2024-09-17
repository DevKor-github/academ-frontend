'use client';

import axios, { AxiosError } from 'axios';
import { BACKEND_BASE_URL, KEY_FOR_USER_AUTH } from '@/lib/directive';
import { NoPermissionError, FailedResponseError, NoRequestError, NoResponseError } from '../errors';

const withTokenInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  maxRedirects: 0,
  withCredentials: true,
  validateStatus: (status: number) => status >= 200 || status < 500,
});

withTokenInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem(KEY_FOR_USER_AUTH) || 'null');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

withTokenInstance.interceptors.response.use(
  (res) => {
    const data = res.data;
    data.statusCode = res.status;
    if (data.statusCode === 401) {
      return Promise.reject(new NoPermissionError());
    }
    return Promise.resolve(res.data);
  },
  (error: AxiosError) => {
    if (error.response) {
      return Promise.reject(new FailedResponseError());
    } else if (error.request) {
      return Promise.reject(new NoResponseError());
    } else {
      return Promise.reject(new NoRequestError());
    }
  },
);

export default withTokenInstance;
