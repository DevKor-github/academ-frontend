function neverEmpty<T>(v: T | undefined): T {
  if (v === undefined) {
    throw new Error('Build Failed: directive missing. check .env file');
  }
  return v;
}

export const IS_DEBUG = process.env.NODE_ENV === 'development';
export const ELEM_PER_PAGE = 10;
export const KEY_FOR_ACCESS_TOKEN = 'KEYaccessToken';
export const KEY_FOR_REFRESH_TOKEN = 'KEYrefreshToken';
export const KEY_TO_COUNT_TABS = 'tabCountNew'; // 'tabCount' is deprecated
export const APP_VERSION = process.env.APP_VERSION || 'APP_VERSION_NOT_FOUND';

export const URL_BACKEND_BASE = neverEmpty<string>(process.env.NEXT_PUBLIC_BACKEND_API_URL);
export const URL_BUG_REPORT = neverEmpty<string>(process.env.NEXT_PUBLIC_BUG_REPORT);
export const URL_CUSTOMER_SURVEY = neverEmpty<string>(process.env.NEXT_PUBLIC_CUSTOMER_SURVEY);
