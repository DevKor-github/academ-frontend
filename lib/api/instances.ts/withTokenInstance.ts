'use client';

import axios from 'axios';
import { BACKEND_BASE_URL, KEY_FOR_USER_AUTH } from '@/lib/directive';

const withTokenInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  maxRedirects: 0,
  withCredentials: true,
  validateStatus: () => true, // status >= 200 && status < 500,
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

export default withTokenInstance;
