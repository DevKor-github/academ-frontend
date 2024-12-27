'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface ParamStateOptions<State> {
  encoder: (state: State) => string;
  decoder: (encoded: string) => State;
  omit?: (state: State) => boolean;
}

const useParamState = <S,>(
  defaultState: S | (() => S),
  queryKey: string,
  options: ParamStateOptions<S>,
): [S, Dispatch<SetStateAction<S>>] => {
  const { encoder, decoder, omit } = options;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [state, setState] = useState(
    searchParams.get(queryKey) !== null
      ? decoder(String(searchParams.get(queryKey)))
      : defaultState,
  );

  const prevState = useRef(state);
  const prevSp = useRef(searchParams.toString());

  useEffect(() => {
    if (state !== prevState.current) {
      prevState.current = state;

      const sp = new URLSearchParams();
      for (const [key, value] of searchParams) {
        if (key !== queryKey) {
          sp.append(key, value);
        }
      }
      const encoded = encoder(state);

      if (!omit || !omit(state)) sp.append(queryKey, encoded);

      router.replace(`${pathname}?${sp.toString()}`);
    }
  }, [state, router, queryKey, pathname, encoder, searchParams, omit]);

  useEffect(() => {
    if (searchParams.toString() !== prevSp.current) {
      prevSp.current = searchParams.toString();

      const got = searchParams.get(queryKey);

      if (got !== null) {
        const newState = decoder(got);
        setState(newState);
      }
    }
  }, [searchParams, decoder, queryKey, defaultState]);

  return [state, setState];
};

export default useParamState;

//////////////////////////// extensions ////////////////////////////

const identity = <T,>(x: T) => x;
const neverOmit = () => false;

export const stringOpts = {
  encoder: identity,
  decoder: identity,
  omit: neverOmit,
};

export const optionalNumberOpts = {
  encoder: (n: number | undefined) => (n === undefined ? '' : n.toString()),
  decoder: (s: string) => {
    if (s === '') return undefined;
    const n = Number(s);
    return Number.isNaN(n) ? undefined : n;
  },
  omit: neverOmit,
};
