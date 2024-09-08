export const isDebug = process.env.NODE_ENV === 'development';
export const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const elemPerPage = 10;
export const keyForUserAuth = 'userSessionId';
export const keyToCountTabs = 'tabCountNew'; // 'tabCount' is deprecated
