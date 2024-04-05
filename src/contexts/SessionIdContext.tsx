import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

export function SessionIdProvider({ children }: SessionIdProviderProps) {
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const idFromStorage = sessionStorage.getItem('userSessionId');
    if (idFromStorage && idFromStorage !== '') {
      setSessionId(idFromStorage); // if object then JSON.parse(sessionUser)
    }
  }, []);

  // Save the session to storage whenever it changes
  useEffect(() => {
    if (sessionId) {
      sessionStorage.setItem('userSessioIdn', sessionId);
    } else {
      sessionStorage.removeItem('userSessionId');
    }
  }, [sessionId]);

  return <SessionIdContext.Provider value={{ sessionId, setSessionId }}>{children}</SessionIdContext.Provider>;
}
