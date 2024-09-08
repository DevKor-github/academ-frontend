'use client';

import { useEffect, useState } from 'react';

export default function useSharedState<T extends JSONValue>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    // use sessionStorage first
    const storagedState = sessionStorage.getItem(key) || localStorage.getItem(key) || JSON.stringify(initial);
    return JSON.parse(storagedState);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    const onStorageEvent = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== JSON.stringify(state)) {
        setState(JSON.parse(e.newValue || 'null'));
      }
    };

    window.addEventListener('storage', onStorageEvent);

    // Cleanup function
    return () => window.removeEventListener('storage', onStorageEvent);
  }, [key, state]);

  return [state, setState] as const;
}
