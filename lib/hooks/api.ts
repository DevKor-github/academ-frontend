import { useEffect, useState } from 'react';

export function useApi<Req, Res>(apiCall: ApiCall<Req, Res>, req: Req) {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<ApiResponse<Res> | null>(null);

  useEffect(() => {
    apiCall(req).then((a) => {
      setResponse(a);
      setLoading(false);
    });
  }, []);

  return { response, loading } as ApiState<Res>;
}
