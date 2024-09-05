import { build } from './builder';

export const apiProfileUpdateBasic = build<UpdateProfileReq, null>('POST', '/api/mypage/update-basic');

export const apiProfileUpdatePW = build<UpdatePWReq, null>('POST', '/api/mypage/update-password');

export const apiMyPageBasics = build<{}, MyPageBasicInfo>('GET', '/api/mypage/info');
export const apiMyPageComments = build<{ page: number }, AcdComment[]>('GET', '/api/mypage/my-comments');
export const apiMyPageBookmarks = build<{ page: number }, Course[]>('GET', '/api/mypage/my-bookmarks');
