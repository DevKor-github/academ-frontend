export const IS_DEBUG = process.env.NODE_ENV === 'development';
export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const ELEM_PER_PAGE = 10;
export const KEY_FOR_USER_AUTH = 'userSessionId';
export const KEY_TO_COUNT_TABS = 'tabCountNew'; // 'tabCount' is deprecated
export const APP_VERSION = process.env.APP_VERSION || 'APP_VERSION_NOT_FOUND';
