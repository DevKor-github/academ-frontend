import { AxiosError, AxiosInstance } from 'axios';
import { NoPermissionError, FailedResponseError, NoResponseError, NoRequestError } from '../errors';
import { KEY_FOR_USER_AUTH } from '@/lib/directive';
import { failWith } from '../builder';

/**
 *
 * @param instance
 */
export function interceptAddToken(instance: AxiosInstance) {
  instance.interceptors.request.use(
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
}

/**
 *
 * @param instance
 */
export function interceptAcdApiError(instance: AxiosInstance) {
  instance.interceptors.response.use(
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
}

/**
 *
 * @param instance
 */
export function interceptWithResolve(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (res) => {
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
