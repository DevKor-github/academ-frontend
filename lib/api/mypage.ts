import { build } from './builder';
import withTokenInstance from './instances.ts/withTokenInstance';

export const apiProfileUpdateBasic = build<UpdateProfileReq, null>(
  withTokenInstance,
  'POST',
  '/api/mypage/update-basic',
);

export const apiProfileUpdatePW = build<UpdatePWReq, null>(withTokenInstance, 'POST', '/api/mypage/update-password');

export const apiMyPageBasics = build<Record<string, never>, MyPageBasicInfo>(
  withTokenInstance,
  'GET',
  '/api/mypage/info',
);
export const apiMyPageComments = build<{ page: number }, AcdMyComment[]>(
  withTokenInstance,
  'GET',
  '/api/mypage/my-comments',
);
export const apiMyPageBookmarks = build<{ page: number }, Course[]>(
  withTokenInstance,
  'GET',
  '/api/mypage/my-bookmarks',
);

export const apiDeleteAccount = build<{ password: string }, null>(
  withTokenInstance,
  'POST',
  '/api/mypage/delete-profile',
);
