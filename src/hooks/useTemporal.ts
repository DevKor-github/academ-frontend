import { useCallback, useEffect, useState } from 'react';

export function useTemporal<T>(ms: number, initial: T, temporal: T) {
  const [v, setV] = useState(initial);

  useEffect(() => {
    if (v === temporal) {
      setTimeout(() => {
        setV(initial);
      }, ms);
    }
  }, [v]);

  const resetV = useCallback(() => {
    setV(temporal);
  }, [temporal]);

  return [v, resetV] as const;
}

export const useAnimationTimeout = (ms: number) => useTemporal(ms, false, true);
