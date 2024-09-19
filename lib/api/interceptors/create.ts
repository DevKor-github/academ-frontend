import axios from 'axios';
import { BACKEND_BASE_URL } from '@/lib/directive';

export function createPureInstance() {
  return axios.create({
    baseURL: BACKEND_BASE_URL,
    maxRedirects: 0,
    withCredentials: true,
    validateStatus: (status: number) => 200 <= status && status < 500,
  });
}
