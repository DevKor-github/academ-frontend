import 'server-only';

import { URL_BACKEND_BASE } from '../../directive';

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

  return (await fetch(URL_BACKEND_BASE + url + (encoded === '' ? '' : '?' + encoded))).json() as Res;
}
