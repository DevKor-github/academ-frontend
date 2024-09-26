'use client';

import { createContext, useContext } from 'react';

import useTabSharedState from '@/lib/hooks/shared';

import { KEY_FOR_ACCESS_TOKEN, KEY_FOR_REFRESH_TOKEN } from '@/lib/directive';

export type AuthTokensContextType = [AuthTokens, SetState<JWT | null>, SetState<JWT | null>];
export const AuthTokensContext = createContext<AuthTokensContextType>([{ accessToken: null, refreshToken: null}, () => {}, () => {}]);

export function useAuthTokens() {
  return useContext(AuthTokensContext);
}

export default function SessionIdProvider({ children }: React.PropsWithChildren<unknown>) {
  const [refreshToken, setRefreshToken] = useTabSharedState<JWT | null>(KEY_FOR_REFRESH_TOKEN, null);
  const [accessToken, setAccessToken] = useTabSharedState<JWT | null>(KEY_FOR_ACCESS_TOKEN, null);

  const sessionId: AuthTokens = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  return (
    <AuthTokensContext.Provider
      // XXX : should this order reversed?
      key={sessionId?.accessToken || sessionId?.refreshToken}
      value={[sessionId, setAccessToken, setRefreshToken]}
    >
      {children}
    </AuthTokensContext.Provider>
  );
}
