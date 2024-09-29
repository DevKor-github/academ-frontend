'use client';

import { createContext, useContext, useMemo } from 'react';

import { AxiosInstance } from 'axios';
import useTabSharedState from '@/lib/hooks/shared';
import { KEY_FOR_ACCESS_TOKEN, KEY_FOR_REFRESH_TOKEN } from '@/lib/directive';

import { createPureInstance } from '@/lib/api-client/instances/_create';
import {
  mouldAsApiResponse,
  interceptRefreshFirst,
  insertToken,
  retryWithRefresh,
} from '@/lib/api-client/instances/_interceptors';

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
};

type AuthTokensContextType = [AuthTokens, SetState<JWT | null>, SetState<JWT | null>];
export const AuthTokensContext = createContext<AuthTokensContextType>([
  {
    accessToken: null,
    refreshToken: null,
    instances: {
      basic: undefined,
      refreshFirst: undefined,
      doRefresh: undefined,
      withTokenOnce: undefined,
    },
  },
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

  const basic = useMemo(() => {
    const i = createPureInstance();
    mouldAsApiResponse(i);
    return i;
  }, []);

  const refreshFirst = useMemo(() => {
    const i = createPureInstance();
    interceptRefreshFirst(i, basic, refreshToken, setAccessToken);
    insertToken(i, accessToken);
    // run
    mouldAsApiResponse(i);
    return i;
  }, [basic, accessToken, refreshToken, setAccessToken]);

  const withTokenOnce = useMemo(() => {
    const i = createPureInstance();
    insertToken(i, accessToken);
    mouldAsApiResponse(i);
    return i;
  }, [accessToken]);

  const doRefresh = useMemo(() => {
    const i = createPureInstance();
    insertToken(i, accessToken);
    // run
    mouldAsApiResponse(i);
    retryWithRefresh(i, basic, withTokenOnce, refreshToken, setAccessToken);
    return i;
  }, [accessToken, refreshToken, setAccessToken, basic, withTokenOnce]);

  const instances = { basic, refreshFirst, doRefresh, withTokenOnce };
  /* * */

  const sessionId: AuthTokens & { instances: ApiInstances } = { accessToken, refreshToken, instances };

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
