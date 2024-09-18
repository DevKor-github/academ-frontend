'use client';

import axios, { AxiosError } from 'axios';
import { BACKEND_BASE_URL } from '@/lib/directive';
import { NoPermissionError, FailedResponseError, NoResponseError, NoRequestError } from '../errors';

const basicInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  maxRedirects: 0,
  withCredentials: true,
  validateStatus: (status: number) => 200 <= status && status < 500,
});

basicInstance.interceptors.response.use(
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

export default basicInstance;
