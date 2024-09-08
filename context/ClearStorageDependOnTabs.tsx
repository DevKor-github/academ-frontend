"use client";

import { isDebug, keyToCountTabs } from '@/lib/directive';
import { useEffect } from 'react';

/**
 * 활성 탭이 모두 hide되는 순간에 localStorage를 비웁니다.
 * 이 동작은 Session Context Provider에서 제공되어서는 안됩니다:
 *  Session Context Provider는 해당 Context를 사용하는 컴포넌트가 불릴 때 여러번 존재할 수 있습니다.
 * 
 * @param param0 
 * @returns 
 */
export default function ClearStorageDependOnTabs({ children } : React.PropsWithChildren<unknown>) {
  useEffect(() => {
    const prevCount = Number(localStorage.getItem(keyToCountTabs) || '0');
    localStorage.setItem(keyToCountTabs, String(prevCount + 1));

    const callback = () => {
      const count = Number(localStorage.getItem(keyToCountTabs) || '0');

      // Since React dev mode render twice;
      const unit = isDebug ? 2 : 1;
      localStorage.setItem(keyToCountTabs, String(count - unit));

      if (count <= unit) {
        localStorage.clear();
      }
    };

    window.addEventListener('pagehide', callback);

    return () => window.removeEventListener('pagehide', callback); // Cleanup
  }, []);

  return children;
}
