import { useState } from 'react';

import { ApiCall, ApiCTX, ApiResponse } from '@/lib/api/builder';

/**
 * LoadingState는 Paged<T>의 로딩 상태를 나타냅니다.
 * 'bot' - 페이지를 로드하려는 시도를 하지 않은 초기 상태입니다.
 * 'done' - 페이지를 1개 이상 로드한 상태입니다.
 * 'never' - 페이지 로딩에 완전히 실패하였습니다.
 */
export type LoadingState = 'bot' | 'done' | 'never';

export type Paged<T> =
  | {
      loadingState: 'bot';
      failwith: unknown;
      data: unknown;
      eoc: unknown;
      page: number;
    }
  | {
      loadingState: 'done';
      failwith: null;
      data: T[];
      eoc: boolean;
      page: number;
    }
  | {
      loadingState: 'done';
      failwith: ApiResponse<T[]>;
      data: T[];
      eoc: boolean;
      page: number;
    }
  | {
      loadingState: 'never';
      failwith: ApiResponse<T[]>;
      data: T[];
      eoc: boolean;
      page: number;
    };

export function usePagination<Req extends { page: number }, Res>(
  apiCall: ApiCall<Req, Array<Res>>,
  // checkEoc: (r: Res) => boolean,
): [Paged<Res>, (r: Req, ctx?: ApiCTX) => void, () => void] {
  const firstPage = 0;

  const [loadingState, setLoadingState] = useState<LoadingState>('bot');
  const [data, setData] = useState<Res[] | null>(null);
  const [eoc, setEoc] = useState<boolean>(false);
  const [failwith, setFailwith] = useState<null | ApiResponse<Res[]>>(null);
  const [page, setPage] = useState<number>(firstPage);

  function fetchThis(req: Req, ctx?: ApiCTX) {
    setPage(req.page);
    apiCall(req, ctx).then((a) => {
      if (a.statusCode === 404) {
        setEoc(true);
        setData(data || []);
        setFailwith(a);
      } else if (a.status === 'SUCCESS') {
        if (data === null) {
          setData(a.data);
        } else {
          setData(data.concat(a.data));
        }
      } else {
        setData(data || []);
        setFailwith(a);
      }

      if (loadingState === 'bot') {
        if (a.status === 'SUCCESS') {
          setLoadingState('done');
        } else {
          setLoadingState('never');
        }
      }
    });
  }

  function resetPagination() {
    setLoadingState('bot');
    setPage(firstPage);
    setData(null);
    setEoc(false);
    setFailwith(null);
  }

  return [{ loadingState, data, eoc, page, failwith } as Paged<Res>, fetchThis, resetPagination];
}
