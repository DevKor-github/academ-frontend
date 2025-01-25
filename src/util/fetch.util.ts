import { getAccessToken, getRefreshToken } from '@/auth/auth.util';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function fetchAPI(input: string, init: RequestInit = {}) {
  const url = new URL(input, BASE_URL);
  return fetch(url, init);
}

export async function fetchAPIAuth(input: string, init: RequestInit = {}) {
  const access = await getAccessToken();
  const initWithAccess = access ? withToken(access)(init) : init;
  const firstTry = await fetchAPI(input, initWithAccess);

  if (firstTry.status !== 401) {
    console.log('first try success.');
    return firstTry;
  }

  const refresh = await getRefreshToken();
  if (refresh === undefined) {
    console.log('no refresh token');
    return firstTry;
  }
  const newAccess = await fetchAPI('/api/refresh-token', withToken(refresh)(init));
  if (newAccess.status !== 200) {
    console.log('token refresh fail');
    return firstTry;
  }

  const newAccessToken = await newAccess.json().then((v) => v.data);

  const last = await fetchAPI(input, withToken(newAccessToken)(init));

  if (last.status === 401 && globalThis.window) {
    globalThis.window.location.href = '/login';
  }

  return last;
}

///////////////////// utilities /////////////////////

/**
 * url manipulation 을 위한 헬퍼 함수입니다.
 */
export function searchParamString(input: Record<string, string | number | undefined>, prefix: '?' | '&' | '' = '') {
  const sp = new URLSearchParams();
  Object.entries(input).forEach(([k, v]) => {
    if (v !== undefined) sp.append(k, String(v));
  });
  const str = sp.toString();
  if (str === '') return str;
  return `${prefix}${str}`;
}

/**
 * RequestInit을 만들기 위한 헬퍼 함수입니다. GET().then(v => ...).then(..) 형태로 쓸 수 있도록 의도했습니다.
 */
export async function GET(): Promise<RequestInit> {
  return {
    method: 'GET',
  };
}

export async function POST(): Promise<RequestInit> {
  return {
    method: 'POST',
  };
}

/**
 *
 */
export const withToken =
  (bearer: string) =>
  (init: RequestInit): RequestInit => ({
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Authorization: `Bearer ${bearer}`,
    },
  });

export const withJsonBody =
  (body: unknown) =>
  (init: RequestInit): RequestInit => ({
    ...init,
    headers: {
      ...(init.headers ?? {}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withStatusCode = (statusCode: number) => (j: any) => {
  if (typeof j === 'object' && j !== null)
    return {
      ...j,
      statusCode,
    };
  console.warn('경고: statusCode를 삽입하지 않습니다.');
  return j;
};
