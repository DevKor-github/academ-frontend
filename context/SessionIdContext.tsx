import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { apiLogout } from '@/api/login';

type SessionId = string;

interface SessionIdContextType {
  sessionId: SessionId;
  setSessionId: React.Dispatch<React.SetStateAction<SessionId>>;
}

const SessionIdContext = createContext<SessionIdContextType>({ sessionId: '', setSessionId: () => {} });

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
  const [sessionId, setSessionId] = useState(localStorage.getItem(keyForStorage) || '');

  useTabTracker();

  useEffect(() => {
    const idFromStorage = localStorage.getItem(keyForStorage);
    if (idFromStorage && idFromStorage !== '') {
      setSessionId(idFromStorage); // if object then JSON.parse(sessionUser)
    }
  }, []);

  // Save the session to storage whenever it changes
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem(keyForStorage, sessionId);
    } else {
      localStorage.removeItem(keyForStorage);
    }
  }, [sessionId]);

  return <SessionIdContext.Provider value={{ sessionId, setSessionId }}>{children}</SessionIdContext.Provider>;
}
