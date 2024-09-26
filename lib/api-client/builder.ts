import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

import { IS_DEBUG } from '../directive';

const buildUrlWithParams = (baseUrl: string, req: Record<string, string | number>) => {
  const newReq = Object.keys(req).reduce((acc: Record<string, string>, key) => {
    acc[key] = String(req[key]);
    return acc;
  }, {});
  const params = new URLSearchParams(newReq).toString();
  return params !== '' ? `${baseUrl}?${params}` : baseUrl;
};

type Builder = <Req, Res>(
  instance: AxiosInstance,
  method: 'POST' | 'GET',
  path: string,
  config?: AxiosRequestConfig,
) => ApiCall<Req, Res>;

/**
 * build : automatically generates api call functions
 *
 * @param method
 * @param path
 * @param config
 * @returns
 */
export const build: Builder = <Req, Res>(
  instance: AxiosInstance,
  method: 'POST' | 'GET',
  path: string,
  config: AxiosRequestConfig = {},
) => {
  return async function (req: Req): Promise<ApiResponse<Res>> {
    const firstTry =
      method === 'POST'
        ? instance.post(path, req, config)
        : instance.get(buildUrlWithParams(path, req as Record<string, string | number>), config);

    const firstResult = (await firstTry).data as ApiResponse<Res>;

    if (IS_DEBUG) {
      const show = firstResult.status === 'SUCCESS' ? console.log : console.error;
      show(`[DEBUG] path: ${path} <- \n ${JSON.stringify(firstResult)}`);
    }

    return firstResult;
  };
};

export function failWith(message: string, httpCode: number = -1): ApiResponse<unknown> {
  return {
    status: 'ERROR',
    statusCode: httpCode,
    data: null,
    message,
    version: 'GENERATED FROM FRONTEND',
  };
}
