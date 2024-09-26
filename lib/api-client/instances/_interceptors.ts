import { AxiosError, AxiosInstance } from 'axios';
import { KEY_FOR_ACCESS_TOKEN, KEY_FOR_REFRESH_TOKEN } from '@/lib/directive';
import { failWith } from '../builder';
import basic from './basic';
import withTokenOnce from './withTokenOnce';

/**
 *
 * @param instance
 */
export function insertToken(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem(KEY_FOR_ACCESS_TOKEN) || 'null');
      if (token) {
        config.headers.setAuthorization(`Bearer ${token}`);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}

/**
 *
 * @param instance
 */
export function mouldAsApiResponse(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (res) => {
      res.data.statusCode = res.status;
      return Promise.resolve(res);
    },
    (error: AxiosError) => {
      if (error.response) {
        return failWith(error.message, Number(error.code));
      } else {
        return failWith('Unknown Error');
      }
    },
  );
}

export function retryWithRefresh(instance: AxiosInstance) {
  instance.interceptors.response.use(
    async (res) => {
      if (res.status !== 401) {
        return Promise.resolve(res);
      }

      const rt = JSON.parse(localStorage.getItem(KEY_FOR_REFRESH_TOKEN) || 'null');
      const newToken = (await basic.get('/api/refresh-token', { headers: { Authorization: rt } }))
        .data as ApiResponse<string>;

      if (newToken.status !== 'SUCCESS') {
        return Promise.resolve(res);
      }

      localStorage.setItem(KEY_FOR_ACCESS_TOKEN, JSON.stringify(newToken.data));
      const newRes = await withTokenOnce.request(res.config);

      return Promise.resolve(newRes);
    },
    (error: AxiosError) => Promise.reject(error),
  );
}
