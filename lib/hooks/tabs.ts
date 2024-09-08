'use client';

import { isDebug, keyToCountTabs } from '../directive';
import { useEffect } from 'react';

const onHide = (terminatedCallback: () => unknown) => () => {
  const count = Number(localStorage.getItem(keyToCountTabs) || '0');

  // Since React dev mode render twice;
  const unit = isDebug ? 2 : 1;
  localStorage.setItem(keyToCountTabs, String(count - unit));

  if (count <= unit) {
    terminatedCallback();
  }
};

/**
 * 전체 컴포넌트(탭)의 개수를 추적하고 마지막 탭이 숨겨질 때 terminatedCallback 함수를 호출합니다.
 * 유의사항: 마지막 탭이 새로고침 될 때도 terminatedCallback 함수가 불립니다.
 * 이 경우 sessionStorage를 이용해 이 문제를 해결할 수 있습니다. 참고: useSharedState
 *
 * @param terminatedCallback
 */
export default function useTabTermination(terminatedCallback: () => unknown) {
  const callback = onHide(terminatedCallback);

  useEffect(() => {
    const prevCount = Number(localStorage.getItem(keyToCountTabs) || '0');
    localStorage.setItem(keyToCountTabs, String(prevCount + 1));

    window.addEventListener('pagehide', callback);

    return () => window.removeEventListener('pagehide', callback); // Cleanup
  }, [callback]);
}
