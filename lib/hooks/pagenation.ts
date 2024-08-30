import { useState } from 'react';

import { ApiCall, ApiCTX, ApiResponse } from '@/lib/api/builder';

export type Paged<T> =
  | {
      neverLoaded: true;
      failwith: unknown;
      data: unknown;
      eoc: unknown;
      page: number;
    }
  | {
      neverLoaded: false;
      failwith: null;
      data: T[];
      eoc: boolean;
      page: number;
    }
  | {
      neverLoaded: false;
      failwith: ApiResponse<T[]>;
      data: T[];
      eoc: boolean;
      page: number;
    };

export function usePagenation<Req extends { page: number }, Res>(
  apiCall: ApiCall<Req, Array<Res>>,
  // checkEoc: (r: Res) => boolean,
): [Paged<Res>, (r: Req, ctx?: ApiCTX) => void, () => void] {
  const firstPage = 0;

  const [neverLoaded, setNeverLoaded] = useState<boolean>(true);
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

      if (neverLoaded) {
        setNeverLoaded(false);
      }
    });
  }

  function resetPagenation() {
    setNeverLoaded(true);
    setPage(firstPage);
    setData(null);
    setEoc(false);
    setFailwith(null);
  }

  return [{ neverLoaded, data, eoc, page, failwith } as Paged<Res>, fetchThis, resetPagenation];
}
