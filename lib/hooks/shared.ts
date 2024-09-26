'use client';

import { useEffect, useState } from 'react';
import { IS_DEBUG, KEY_TO_COUNT_TABS } from '../directive';

export default function useTabSharedState<T extends JSONValue>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    // use sessionStorage first
    const storagedState =
      /** if this is only-tab */ Number(localStorage.getItem(KEY_TO_COUNT_TABS)) <= (IS_DEBUG ? 2 : 1)
        ? sessionStorage.getItem(key) || JSON.stringify(initial)
        : sessionStorage.getItem(key) || localStorage.getItem(key) || JSON.stringify(initial);
    return JSON.parse(storagedState);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
    sessionStorage.setItem(key, JSON.stringify(state));

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
