'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useLayoutEffect } from 'react';

import { apiLogout } from '@/lib/api/login';
import { apiCheckLogin } from '@/lib/api/login';
import { apiJWTRefresh } from '@/lib/api/authHelper';
import { Try } from '@/lib/types/result';

export type SessionIdContextType = [SessionId, SetState<SessionId>];

const SessionIdContext = createContext<SessionIdContextType>([null, () => {}]);

export function useSessionId() {
  return useContext(SessionIdContext);
}

interface SessionIdProviderProps {
  children: ReactNode;
}

export const keyForStorage = 'userSessionId';

const useTabTracker = (s: SessionId, setS: React.Dispatch<React.SetStateAction<SessionId>>) => {
  useEffect(() => {
    const prevCount = Number(localStorage.getItem('tabCount') || '0');
    localStorage.setItem('tabCount', String(prevCount + 1));

    const onUnload = () => {
      const count = Number(localStorage.getItem('tabCount') || '0');

      // Since React dev mode render twice;
      const i = process.env.NODE_ENV === 'development' ? 2 : 1;
      localStorage.setItem('tabCount', String(count - i));

      if (count <= 0) {
        apiLogout({}, { token: s?.accessToken });
        setS(null);
        localStorage.clear();
      }
    };

    window.addEventListener('beforeunload', onUnload);

    // Cleanup function
    return () => window.removeEventListener('beforeunload', onUnload);
  }, []);
};

export function SessionIdProvider({ children }: SessionIdProviderProps) {
  const [sessionId, setSessionId] = useState<SessionId | null>(
    Try(() => JSON.parse(globalThis?.localStorage?.getItem(keyForStorage) || 'null')).unwrapOrElse(() => null),
  );

  useTabTracker(sessionId, setSessionId);

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
        localStorage.removeItem(keyForStorage);
        setSessionId(null);
      }
    });
  }, []);

  return <SessionIdContext.Provider value={[sessionId, setSessionId]}>{children}</SessionIdContext.Provider>;
}
