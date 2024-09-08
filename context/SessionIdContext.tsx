"use client";

import { createContext, useContext, ReactNode } from 'react';

import useTabSharedState from '@/lib/hooks/shared';

import { keyForUserAuth } from '@/lib/directive';

export type SessionIdContextType = [SessionId, SetState<SessionId>];
export const SessionIdContext = createContext<SessionIdContextType>([null, () => { }]);

export function useSessionId() {
  return useContext(SessionIdContext);
}

interface SessionIdProviderProps {
  children: ReactNode;
}

export default function SessionIdProvider({ children }: SessionIdProviderProps) {
  const [sessionId, setSessionId] = useTabSharedState<SessionId | null>(keyForUserAuth, null);

  // Temporal patch - use less traffic

  /*
  useEffect(() => {
    apiCheckLogin({}, { token: sessionId?.accessToken }).then((a) => {
      if (a.status === 'SUCCESS') {
        // well done
      } else {
        if (a.status === 'ERROR' && sessionId?.refreshToken === null) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요');
        } else if (a.status === 'ERROR' && sessionId !== null && sessionId?.refreshToken !== null) {
          apiJWTRefresh({}, { token: sessionId?.refreshToken }).then((a) => {
            if (a.status === 'SUCCESS') {
              setSessionId({
                accessToken: a.data,
                refreshToken: sessionId?.refreshToken || null,
              });
            } else {
              alert('세션이 만료되었습니다. 다시 로그인해주세요');
            }
          });
        }
        localStorage.removeItem(keyForUserAuth);
        setSessionId(null);
      }
    });
  }, []);
  */

  return (
    <SessionIdContext.Provider
      key={sessionId?.accessToken || sessionId?.refreshToken}
      value={[sessionId, setSessionId]}
    >
      {children}
    </SessionIdContext.Provider>
  );
}
