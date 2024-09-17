'use client';

import axios, { AxiosError } from 'axios';
import { BACKEND_BASE_URL, KEY_FOR_USER_AUTH } from '@/lib/directive';
import { NoPermissionError, FailedResponseError, NoRequestError, NoResponseError } from '../errors';

const withRefresh = axios.create({
  baseURL: BACKEND_BASE_URL,
  maxRedirects: 0,
  withCredentials: true,
  validateStatus: (status: number) => 200 <= status && status < 500,
});

withRefresh.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem(KEY_FOR_USER_AUTH) || 'null')?.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

withRefresh.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      return Promise.reject(new NoPermissionError());
    }
    return Promise.resolve(res);
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

// TODO : add refresh logic

export default withRefresh;
