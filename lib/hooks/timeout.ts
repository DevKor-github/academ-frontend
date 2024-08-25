import { useEffect, useState } from "react";

export function useTemporal<T>(ms : number, initial: T, temporal: T) {
  const [isAnimating, setIsAnimating] = useState(initial);

  useEffect(
    () => {
      if (isAnimating) {
        setTimeout(() => {
          setIsAnimating(temporal);
        }, ms);
      }
    }, [isAnimating]
  );
  
  function resetAnimation() {
    setIsAnimating(initial);
  }

  return [isAnimating, resetAnimation] as const;
}

export const useAnimationTimeout = (ms : number) => useTemporal(ms, true, false)