'use client';

import axios from 'axios';
import { BACKEND_BASE_URL } from '@/lib/directive';

const basicInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  maxRedirects: 0,
  withCredentials: true,
  validateStatus: (status: number) => status >= 200 || status < 500,
});

export default basicInstance;
