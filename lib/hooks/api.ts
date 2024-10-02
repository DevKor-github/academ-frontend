import { useCallback, useEffect, useState } from 'react';
import { KyInstance } from 'ky';
import { ApiCall } from '../api-client/builder';

export function useApi<Req, Res>(instance: KyInstance | undefined, apiCall: ApiCall<Req, Res>, req: Req) {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<ApiResponse<Res> | null>(null);

  const load = useCallback(() => {
    if (loading) {
      apiCall(instance, req).then((a) => {
        setResponse(a);
        setLoading(false);
      });
    }
  }, [instance, apiCall, req, loading]);

  useEffect(load, [load]);

  return { response, loading } as ApiState<Res>;
}
