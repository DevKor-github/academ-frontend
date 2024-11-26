import { build } from '../builder';

export const apiProfileUpdateBasic = build<UpdateProfileReq, null>('post', 'api/mypage/update-basic');
export const apiProfileUpdatePW = build<UpdatePWReq, null>('post', 'api/mypage/update-password');
export const apiMyPageBasics = build<Record<string, never>, MyPageBasicInfo>('get', 'api/mypage/info');
export const apiMyPageComments = build<ReqPaginated, AcdMyComment[]>('get', 'api/mypage/my-comments');
export const apiMyPageCommentsCount = build<Empty, number>('get', 'api/mypage/count-my-comments');
export const apiMyPageBookmarks = build<ReqPaginated, Course[]>('get', 'api/mypage/my-bookmarks');
export const apiMyPageBookmarksCount = build<Empty, number>('get', 'api/mypage/count-my-bookmarks');
export const apiDeleteAccount = build<{ password: string }, null>('post', 'api/mypage/delete-profile');
