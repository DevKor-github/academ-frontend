import 'server-only';

import { BACKEND_BASE_URL } from '../../directive';

/**
 * fetch by 'get' method on server side
 *
 * @param url
 * @param params
 * @returns
 */
export async function ssget<Req extends NonNullable<unknown>, Res>(url: string, params: Req) {
  const encoded = Object.keys(params)
    .map((k) => `${k}=${encodeURIComponent(String((params as Record<string, unknown>)[k]))}`)
    .join('&');

  return (await fetch(BACKEND_BASE_URL + url + (encoded === '' ? '' : '?' + encoded))).json() as Res;
}
