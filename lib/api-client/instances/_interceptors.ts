// import { failWith } from '../builder';
import { KyInstance } from 'ky-universal';

export function interceptRefreshFirst(
  instance: KyInstance,
  basic: KyInstance,
  refreshToken: JWT | null,
  setAccessToken: SetState<JWT | null>,
) {
  return instance.extend({
    hooks: {
      beforeRequest: [
        async (config) => {
          const rt = refreshToken;
          const newToken = (await basic
            .get<ApiResponse<string>>('api/refresh-token', { headers: { Authorization: `Bearer ${rt}` } })
            .json()) as ApiResponse<string>;

          if (newToken.status === 'SUCCESS') {
            setAccessToken(newToken.data);
            // Temp fix
            config.headers.set('Authorization', `Bearer ${newToken.data}`);
          }

          return config;
        },
      ],
    },
  });
}

// import { AsyncLocalStorage } from 'async_hooks';

/**
 *
 * @param instance
 */
export function insertToken(instance: KyInstance, accessToken: JWT | null) {
  return instance.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          if (accessToken) {
            request.headers.set('Authorization', `Bearer ${accessToken}`);
          }
          return request;
        },
      ],
    },
  });
}

export function retryWithRefresh(
  instance: KyInstance,
  basic: KyInstance,
  withTokenOnce: KyInstance,
  refreshToken: JWT | null,
  setAccessToken: SetState<JWT | null>,
) {
  return instance.extend({
    hooks: {
      afterResponse: [
        async (_req, _opt, res) => {
          if (res.status !== 401) {
            return Promise.resolve(res);
          }

          const rt = refreshToken;
          const newToken = (await basic
            .get<ApiResponse<string>>('api/refresh-token', { headers: { Authorization: `Bearer ${rt}` } })
            .json()) as ApiResponse<string>;

          if (newToken.status !== 'SUCCESS') {
            setAccessToken(null);
            return Promise.resolve(res);
          }

          setAccessToken(newToken.data);
          // Temp fix
          _opt.headers = {
            ..._req.headers,
            ...{ Authorization: `Bearer ${newToken.data}` },
          };
          const newRes = await withTokenOnce(_req.url, _opt);

          return Promise.resolve(newRes);
        },
      ],
    },
  });
}
