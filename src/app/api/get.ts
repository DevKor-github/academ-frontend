import 'server-only';

const buildUrlWithParams = (baseUrl: string, req: Record<string, string | number>) => {
  const newReq = Object.keys(req).reduce((acc: Record<string, string>, key) => {
    acc[key] = String(req[key]);
    return acc;
  }, {});
  const params = new URLSearchParams(newReq).toString();
  return params !== '' ? `${baseUrl}?${params}` : baseUrl;
};

/**
 * @deprecated
 */
export const GET =
  <Req, Res>(uri: string) =>
  async (req: Req) => {
    const a = await fetch(
      buildUrlWithParams(
        new URL(uri, process.env.NEXT_PUBLIC_BACKEND_API_URL).href,
        req as Record<string, string | number>,
      ),
      { next: { revalidate: 600 } },
    );

    const res = await a.json();
    res.statusCode = a.status;

    return res as unknown as ApiResponse<Res>;
  };
