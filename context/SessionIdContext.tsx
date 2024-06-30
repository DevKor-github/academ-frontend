"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useLayoutEffect } from 'react';

import { apiLogout } from '@/lib/api/login';
import { apiCheckLogin } from '@/lib/api/login';
import { JWT } from '@/lib/models/user';
import { Try } from '@/lib/types/result';


type SessionId = JWT | null;

type SessionIdContextType = [
  SessionId,
  React.Dispatch<React.SetStateAction<SessionId>>
];

const SessionIdContext = createContext<SessionIdContextType>([ null, () => {} ]);

export function useSessionId() {
  return useContext(SessionIdContext);
}

interface SessionIdProviderProps {
  children: ReactNode;
}

export const keyForStorage = 'userSessionId';

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
    // Try(() => JSON.parse(globalThis?.localStorage?.getItem(keyForStorage) || 'null')).unwrapOrElse(() => null)
    globalThis?.localStorage?.getItem(keyForStorage) || null
  );

  useTabTracker();

  // useEffect(() => {
  //   apiCheckLogin({}).then(
  //     (a) => {
  //       if (a.status === "SUCCESS") {
  //         // setSessionId(a.data);
          // localStorage.setItem(keyForStorage,
          //   // JSON.stringify(a.data)
          // );
  //       }
  //       else {
  //         if (a.status === "ERROR" && sessionId !== null) {
  //           alert("세션이 만료되었습니다. 다시 로그인해주세요")
  //         }
  //         localStorage.removeItem(keyForStorage);
  //         setSessionId(null);
  //       }
  //     }
  //   )
  // }, []);

  return <SessionIdContext.Provider value={[ sessionId , setSessionId ]}>{children}</SessionIdContext.Provider>;
}
