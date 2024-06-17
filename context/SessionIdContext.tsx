"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useLayoutEffect } from 'react';

import { apiLogout } from '@/api/login';
import { apiCheckLogin } from '@/api/login';
import { UserProfile } from '@/api/models/user';

type SessionId = UserProfile | null;

interface SessionIdContextType {
  sessionId: SessionId;
  setSessionId: React.Dispatch<React.SetStateAction<SessionId>>;
}

const SessionIdContext = createContext<SessionIdContextType>({ sessionId: null, setSessionId: () => {} });

export function useSessionId() {
  return useContext(SessionIdContext);
}

interface SessionIdProviderProps {
  children: ReactNode;
}

const keyForStorage = 'userSessionId';

const useTabTracker = () => {
  useEffect(() => {
    const prevCount = Number(localStorage.getItem('tabCount') || '0');
    localStorage.setItem('tabCount', String(prevCount + 1));

    const onUnload = () => {
      const count = Number(localStorage.getItem('tabCount') || '0');

      // Since React dev mode render twice;
      const i = process.env.NODE_ENV === 'development' ? 2 : 1;
      localStorage.setItem('tabCount', String(count - i));

      if (count <= 0) {
        apiLogout({});
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
    JSON.parse(localStorage.getItem(keyForStorage) || 'null')
  );

  useTabTracker();

  // Save the session to storage whenever it changes
  useLayoutEffect(() => {
    apiCheckLogin({}).then(
      (a) => {
        if (a.status === "SUCCESS") {
          localStorage.setItem(keyForStorage, JSON.stringify(sessionId));
          setSessionId(a.data);
        }
        else {
          localStorage.removeItem(keyForStorage);
        }
        console.log("What");
      }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SessionIdContext.Provider value={{ sessionId, setSessionId }}>{children}</SessionIdContext.Provider>;
}
