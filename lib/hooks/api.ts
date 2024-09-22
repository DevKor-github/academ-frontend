import { useCallback, useEffect, useState } from 'react';

export function useApi<Req, Res>(apiCall: ApiCall<Req, Res>, req: Req) {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<ApiResponse<Res> | null>(null);

  const load = useCallback(() => {
    apiCall(req).then((a) => {
      setResponse(a);
      setLoading(false);
    });
  }, [apiCall, req]);

  useEffect(load, [load]);

  return { response, loading } as ApiState<Res>;
}
