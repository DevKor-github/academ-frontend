import type { UpdateProfileReq, UpdatePWRequest } from '@/types/user.types';
import { fetchAPIAuth, GET, POST, searchParamString, withJsonBody, withStatusCode } from '@/util/fetch.util';

export async function getMyPageBasics() {
  return await fetchAPIAuth('api/mypage/info').then((v) => v.json().then(withStatusCode(v.status)));
}

export async function getMyPageBookmarksCount() {
  return await fetchAPIAuth('api/mypage/count-my-bookmarks', {}).then((v) => v.json().then(withStatusCode(v.status)));
}

export async function getMyPageCommentsCount() {
  return await fetchAPIAuth('api/mypage/count-my-comments').then((v) => v.json().then(withStatusCode(v.status)));
}

export async function MyPageBookmarks(page: number) {
  const json = await fetchAPIAuth(`api/mypage/my-bookmarks${searchParamString({ page }, '?')}`, await GET()).then((v) =>
    v.json().then(withStatusCode(v.status)),
  );

  json.cursor = page;
  return json;
}

export async function MyPageComments(page: number) {
  const json = await fetchAPIAuth(`api/mypage/my-comments${searchParamString({ page }, '?')}`).then((v) =>
    v.json().then(withStatusCode(v.status)),
  );

  json.cursor = page;

  return json;
}

export async function MyPageBuyMembership(item: string) {
  const ret = await fetchAPIAuth(`api/mypage/buy-access-authority`, await POST().then(withJsonBody({ item })));

  return ret.json().then(withStatusCode(ret.status));
}

export async function MyPageUpdateBasic(req: UpdateProfileReq) {
  const ret = await fetchAPIAuth('api/mypage/update-basic', await POST().then(withJsonBody(req)));
  return ret.json().then(withStatusCode(ret.status));
}

export async function MyPageUpdatePW(req: UpdatePWRequest) {
  const ret = await fetchAPIAuth('api/mypage/update-password', await POST().then(withJsonBody(req)));
  return ret.json().then(withStatusCode(ret.status));
}

/**
 * 현재 백엔드 api가 응답할 때 멤버십 정보가 어떻게 적용된건지 딱히 말을 안 해주기 때문에 일단 임시로 이 가짜(?) api를 만들어놓음
 */
export async function IsLoggedIn() {
  return await fetchAPIAuth('api/mypage/info')
    .then((v) => v.json().then(withStatusCode(v.status)))
    .then(
      (v: ApiResponse<MyPageBasicInfo>) =>
        ({
          ...v,
          data: v.status === 'SUCCESS',
        }) as ApiResponse<boolean>,
    );
}
