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
  }, [key, state]);

  useEffect(
    function SyncSessionStorage() {
      // NOTE : storage event only triggered when value is changed by other tab.
      const onStorageEvent = (e: StorageEvent) => {
        if (e.key === key && e.oldValue !== e.newValue) {
          if (e.newValue === null) {
            sessionStorage.removeItem(key);
          } else {
            sessionStorage.setItem(key, e.newValue);
          }
        }
      };

      window.addEventListener('storage', onStorageEvent);
      return () => window.removeEventListener('storage', onStorageEvent);
    },
    [key],
  );

  return [state, setState] as const;
}
