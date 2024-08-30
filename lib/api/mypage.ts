import { build, createApiHook } from './builder';

export const apiProfileUpdateBasic = build<UpdateProfileReq, null>('POST', '/api/mypage/update-basic');

export const apiProfileUpdatePW = build<UpdatePWReq, null>('POST', '/api/mypage/update-password');

export const apiMyPageBasics = build<{}, MyPageBasicInfo>('GET', '/api/mypage/info');
export const useApiMyPageBasics = createApiHook(apiMyPageBasics);
