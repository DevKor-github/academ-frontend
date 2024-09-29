'use client';
import { IS_DEBUG } from '../directive';
import { KyInstance } from 'ky-universal';

type ApiCallMethods = 'post' | 'get' | 'post-form-urlencoded';

export type ApiCall<Req, Res> = (instance: KyInstance | undefined, req: Req) => Promise<ApiResponse<Res>>;
type Builder = <Req, Res>(
  method: ApiCallMethods,
  path: string,
  headers?: Record<string, string | undefined>,
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
  method: ApiCallMethods,
  path: string,
  headers: Record<string, string | undefined> = {},
) => {
  return async function (instance: KyInstance | undefined, req: Req): Promise<ApiResponse<Res>> {
    if (instance === undefined) {
      return failWith(
        'API가 잘못된 위치에서 호출되었습니다. 이 오류는 일시적이지 않습니다. Academ 운영팀에 문의해주세요.',
      ) as ApiResponse<Res>;
    }

    let firstTry;
    switch (method) {
      case 'post-form-urlencoded':
        firstTry = instance.post<ApiResponse<Res>>(path, {
          searchParams: new URLSearchParams(req as Record<string, string>).toString(),
          headers: {
            ...headers,
            ...{ 'content-type': 'application/x-www-form-urlencoded' },
          },
        });
        break;
      case 'post':
        firstTry = instance.post<ApiResponse<Res>>(path, { json: req, headers });
        break;
      case 'get':
        firstTry = instance.get<ApiResponse<Res>>(path, {
          searchParams: req as Record<string, string | number | boolean>,
          headers,
        });
        break;
    }

    const firstResult = await firstTry.json();

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
