'use client';

import axios from 'axios';
import { URL_BACKEND_BASE } from '@/lib/directive';

export function createPureInstance() {
  return axios.create({
    baseURL: URL_BACKEND_BASE,
    maxRedirects: 0,
    withCredentials: true,
    validateStatus: (status: number) => 200 <= status && status < 500,
  });
}
