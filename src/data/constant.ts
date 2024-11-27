export const IS_DEBUG = process.env.NODE_ENV === 'development';
export const ELEM_PER_PAGE = 10;
export const APP_VERSION = process.env.APP_VERSION || 'APP_VERSION_NOT_FOUND';

/// session management
export const COOKIE_AUTH_TOKEN = 'auth_token';
export const COOKIE_REFRESH_TOKEN = 'refresh_token';
