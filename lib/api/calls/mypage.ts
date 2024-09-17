import { build } from '../builder';
import withRefresh from '../instances/withRefresh';

export const apiProfileUpdateBasic = build<UpdateProfileReq, null>(withRefresh, 'POST', '/api/mypage/update-basic');
export const apiProfileUpdatePW = build<UpdatePWReq, null>(withRefresh, 'POST', '/api/mypage/update-password');
export const apiMyPageBasics = build<Record<string, never>, MyPageBasicInfo>(withRefresh, 'GET', '/api/mypage/info');
export const apiMyPageComments = build<{ page: number }, AcdMyComment[]>(withRefresh, 'GET', '/api/mypage/my-comments');
export const apiMyPageBookmarks = build<{ page: number }, Course[]>(withRefresh, 'GET', '/api/mypage/my-bookmarks');
export const apiDeleteAccount = build<{ password: string }, null>(withRefresh, 'POST', '/api/mypage/delete-profile');
