'use client';
import { IS_DEBUG } from '../directive';
import { KyInstance } from 'ky-universal';

export type ApiCall<Req, Res> = (instance: KyInstance | undefined, req: Req) => Promise<ApiResponse<Res>>;
type Builder = <Req, Res>(
  method: 'POST' | 'GET',
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
  method: 'POST' | 'GET',
  path: string,
  headers: Record<string, string | undefined> = {},
) => {
  return async function (instance: KyInstance | undefined, req: Req): Promise<ApiResponse<Res>> {
    if (instance === undefined) {
      return failWith(
        'API가 잘못된 위치에서 호출되었습니다. 이 오류는 일시적이지 않습니다. Academ 운영팀에 문의해주세요.',
      ) as ApiResponse<Res>;
    }

    const firstTry =
      method === 'POST'
        ? instance.post<ApiResponse<Res>>(path, { json: req, headers })
        : instance.get<ApiResponse<Res>>(path, {
            searchParams: req as Record<string, string | number | boolean>,
            headers,
          });

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
