import { build } from '../builder';
import withRefreshResolved from '../instances/withRefreshResolved';

export const apiProfileUpdateBasic = build<UpdateProfileReq, null>(
  withRefreshResolved,
  'POST',
  '/api/mypage/update-basic',
);
export const apiProfileUpdatePW = build<UpdatePWReq, null>(withRefreshResolved, 'POST', '/api/mypage/update-password');
export const apiMyPageBasics = build<Record<string, never>, MyPageBasicInfo>(
  withRefreshResolved,
  'GET',
  '/api/mypage/info',
);
export const apiMyPageComments = build<{ page: number }, AcdMyComment[]>(
  withRefreshResolved,
  'GET',
  '/api/mypage/my-comments',
);
export const apiMyPageBookmarks = build<{ page: number }, Course[]>(
  withRefreshResolved,
  'GET',
  '/api/mypage/my-bookmarks',
);
export const apiMyPageBookmarksCount = build<Empty, number>(
  withRefreshResolved,
  'GET',
  '/api/mypage/count-my-bookmarks',
);
export const apiDeleteAccount = build<{ password: string }, null>(
  withRefreshResolved,
  'POST',
  '/api/mypage/delete-profile',
);
