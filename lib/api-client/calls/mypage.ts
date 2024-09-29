import { build } from '../builder';

export const apiProfileUpdateBasic = build<UpdateProfileReq, null>('POST', 'api/mypage/update-basic');
export const apiProfileUpdatePW = build<UpdatePWReq, null>('POST', 'api/mypage/update-password');
export const apiMyPageBasics = build<Record<string, never>, MyPageBasicInfo>('GET', 'api/mypage/info');
export const apiMyPageComments = build<ReqPaginated, AcdMyComment[]>('GET', 'api/mypage/my-comments');
export const apiMyPageCommentsCount = build<Empty, number>('GET', 'api/mypage/count-my-comments');
export const apiMyPageBookmarks = build<ReqPaginated, Course[]>('GET', 'api/mypage/my-bookmarks');
export const apiMyPageBookmarksCount = build<Empty, number>('GET', 'api/mypage/count-my-bookmarks');
export const apiDeleteAccount = build<{ password: string }, null>('POST', 'api/mypage/delete-profile');
