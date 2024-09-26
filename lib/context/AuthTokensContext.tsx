'use client';

import { createContext, useContext } from 'react';

import { AxiosError, AxiosInstance } from 'axios';
import useTabSharedState from '@/lib/hooks/shared';
import { createPureInstance } from '../api-client/instances/_create';
import { failWith } from '../api-client/builder';


import { KEY_FOR_ACCESS_TOKEN, KEY_FOR_REFRESH_TOKEN } from '@/lib/directive';

interface ApiInstances {
  basic?: AxiosInstance;
  refreshFirst?: AxiosInstance;
  doRefresh?: AxiosInstance;
  withTokenOnce?: AxiosInstance;
}


type AuthTokens = {
  accessToken: JWT | null;
  refreshToken: JWT | null;
  instances: ApiInstances;
}

type AuthTokensContextType = [AuthTokens, SetState<JWT | null>, SetState<JWT | null>];
export const AuthTokensContext = createContext<AuthTokensContextType>([
  { accessToken: null, refreshToken: null, instances: {
    basic: undefined,
    refreshFirst: undefined,
    doRefresh: undefined,
    withTokenOnce: undefined,
  } },
  () => {},
  () => {},
]);

export function useAuthTokens() {
  return useContext(AuthTokensContext);
}

export default function AuthTokensProvider({ children }: React.PropsWithChildren<unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refreshToken, setRefreshToken] = useTabSharedState<JWT | null>(KEY_FOR_REFRESH_TOKEN, null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accessToken, setAccessToken] = useTabSharedState<JWT | null>(KEY_FOR_ACCESS_TOKEN, null);



  /** _interceptors.tsx  */

/*
 *
 * @param instance
 */
function interceptRefreshFirst(instance: AxiosInstance, basic: AxiosInstance) {
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
function insertToken(instance: AxiosInstance) {
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
function mouldAsApiResponse(instance: AxiosInstance) {
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

function retryWithRefresh(instance: AxiosInstance, basic: AxiosInstance, withTokenOnce: AxiosInstance) {
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

function cleanupStorageIfFailed(instance: AxiosInstance) {
  instance.interceptors.response.use(
    async (res) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (res.status !== 401) {
        setAccessToken(null);
      }

      return Promise.resolve(res);
    },
    (error: AxiosError) => Promise.reject(error),
  );
}

  


  /** _intercepts.tsx end */

  


  /**  */

  const basic = createPureInstance();
  mouldAsApiResponse(basic);

  const refreshFirst = createPureInstance();
  interceptRefreshFirst(refreshFirst, basic);
  insertToken(refreshFirst);
  // run
  mouldAsApiResponse(refreshFirst);

  const withTokenOnce = createPureInstance();
  insertToken(withTokenOnce);
  mouldAsApiResponse(withTokenOnce);

  const doRefresh = createPureInstance();
  insertToken(doRefresh);
  // run
  mouldAsApiResponse(doRefresh);
  retryWithRefresh(doRefresh, basic, withTokenOnce);

  const instances = { basic, refreshFirst, doRefresh, withTokenOnce };
  /* * */

  const sessionId: AuthTokens & { instances : ApiInstances } = { accessToken, refreshToken, instances };

  return (
    <AuthTokensContext.Provider
      // XXX : should this order reversed?
      key={sessionId.accessToken || sessionId.refreshToken}
      value={[sessionId, setAccessToken, setRefreshToken]}
    >
      {children}
    </AuthTokensContext.Provider>
  );
}
