import { build } from '../builder';
import doRefresh from '../instances/\bwithRefresh';

export const apiProfileUpdateBasic = build<UpdateProfileReq, null>(doRefresh, 'POST', '/api/mypage/update-basic');
export const apiProfileUpdatePW = build<UpdatePWReq, null>(doRefresh, 'POST', '/api/mypage/update-password');
export const apiMyPageBasics = build<Record<string, never>, MyPageBasicInfo>(doRefresh, 'GET', '/api/mypage/info');
export const apiMyPageComments = build<ReqPaginated, AcdMyComment[]>(doRefresh, 'GET', '/api/mypage/my-comments');
export const apiMyPageCommentsCount = build<Empty, number>(doRefresh, 'GET', '/api/mypage/count-my-comments');
export const apiMyPageBookmarks = build<ReqPaginated, Course[]>(doRefresh, 'GET', '/api/mypage/my-bookmarks');
export const apiMyPageBookmarksCount = build<Empty, number>(doRefresh, 'GET', '/api/mypage/count-my-bookmarks');
export const apiDeleteAccount = build<{ password: string }, null>(doRefresh, 'POST', '/api/mypage/delete-profile');
