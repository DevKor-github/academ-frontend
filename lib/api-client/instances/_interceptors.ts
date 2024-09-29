import { AxiosError, AxiosInstance } from 'axios';
import { failWith } from '../builder';
/** _interceptors.tsx  */

/*
 *
 * @param instance
 */
export function interceptRefreshFirst(
  instance: AxiosInstance,
  basic: AxiosInstance,
  refreshToken: JWT | null,
  setAccessToken: SetState<JWT | null>,
) {
  instance.interceptors.request.use(
    async (config) => {
      const rt = refreshToken;
      const newToken = (await basic.get('/api/refresh-token', { headers: { Authorization: `Bearer ${rt}` } }))
        .data as ApiResponse<string>;

      if (newToken.status === 'SUCCESS') {
        setAccessToken(newToken.data);
        // Temp fix
        config.headers.Authorization = `Bearer ${newToken.data}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
}

// import { AsyncLocalStorage } from 'async_hooks';

/**
 *
 * @param instance
 */
export function insertToken(instance: AxiosInstance, accessToken: JWT | null) {
  instance.interceptors.request.use(
    async (config) => {
      if (accessToken) {
        config.headers.setAuthorization(`Bearer ${accessToken}`, true);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}

/**
/**
 *
 * @param instance
 */
export function mouldAsApiResponse(instance: AxiosInstance) {
  instance.interceptors.response.use(
    async (res) => {
      res.data.statusCode = res.status;
      return Promise.resolve(res);
    },
    (error: AxiosError) => {
      if (error.response) {
        error.response.data = failWith(error.message, error.response.status);
        return Promise.resolve(error.response);
      } else {
        return Promise.resolve({
          data: failWith(
            'Academ 서버에 연결할 수 없습니다. 기기가 오프라인이거나 서버에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.',
            error.status || -1,
          ),
          status: error.status || -1,
        });
      }
    },
  );
}

export function retryWithRefresh(
  instance: AxiosInstance,
  basic: AxiosInstance,
  withTokenOnce: AxiosInstance,
  refreshToken: JWT | null,
  setAccessToken: SetState<JWT | null>,
) {
  instance.interceptors.response.use(
    async (res) => {
      if (res.status !== 401) {
        return Promise.resolve(res);
      }

      const rt = refreshToken;
      const newToken = (await basic.get('/api/refresh-token', { headers: { Authorization: `Bearer ${rt}` } }))
        .data as ApiResponse<string>;

      if (newToken.status !== 'SUCCESS') {
        setAccessToken(null);
        return Promise.resolve(res);
      }

      setAccessToken(newToken.data);
      // Temp fix
      res.config.headers.setAuthorization(`Bearer ${newToken.data}`, true);
      const newRes = await withTokenOnce.request(res.config);

      return Promise.resolve(newRes);
    },
    (error: AxiosError) => Promise.reject(error),
  );
}

// function cleanupStorageIfFailed(instance: AxiosInstance) {
//   instance.interceptors.response.use(
//     async (res) => {
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       if (res.status !== 401) {
//         setAccessToken(null);
//       }

//       return Promise.resolve(res);
//     },
//     (error: AxiosError) => Promise.reject(error),
//   );
// }

/** _intercepts.tsx end */
