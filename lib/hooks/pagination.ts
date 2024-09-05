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
      totalLoadingState: 'bot';
      failwith: unknown;
      loading: false;
      data: unknown;
      eoc: unknown;
      page: number;
    }
  | {
      totalLoadingState: 'done';
      failwith: null;
      loading: boolean;
      data: T[];
      eoc: boolean;
      page: number;
    }
  | {
      totalLoadingState: 'done';
      failwith: ApiResponse<T[]>;
      loading: boolean;
      data: T[];
      eoc: boolean;
      page: number;
    }
  | {
      totalLoadingState: 'never';
      failwith: ApiResponse<T[]>;
      loading: boolean;
      data: T[];
      eoc: boolean;
      page: number;
    };

export function usePagination<Req extends { page: number }, Res>(
  apiCall: ApiCall<Req, Array<Res>>,
  // checkEoc: (r: Res) => boolean,
): [Paged<Res>, VoidifyReturn<typeof apiCall>] {
  const firstPage = 0;

  const [totalLoadingState, setTotalLoadingState] = useState<LoadingState>('bot');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Res[] | null>(null);
  const [eoc, setEoc] = useState<boolean>(false);
  const [failwith, setFailwith] = useState<null | ApiResponse<Res[]>>(null);
  const [page, setPage] = useState<number>(firstPage);

  function fetchThis(req: Req, ctx?: ApiCTX) {
    setLoading(true);
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

      if (totalLoadingState === 'bot') {
        if (a.status === 'SUCCESS') {
          setTotalLoadingState('done');
        } else {
          setTotalLoadingState('never');
        }
      }

      setLoading(false);
    });
  }

  return [{ totalLoadingState, loading, data, eoc, page, failwith } as Paged<Res>, fetchThis];
}
