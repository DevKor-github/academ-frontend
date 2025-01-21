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

export async function MyPageUpdatePW(req: UpdatePWReq) {
  const ret = await fetchAPIAuth('api/mypage/update-password', await POST().then(withJsonBody(req)));
  return ret.json().then(withStatusCode(ret.status));
}

export async function MyPageDeleteAccount(req: { password: string }) {
  const ret = await fetchAPIAuth('api/mypage/delete-profile', await POST().then(withJsonBody(req)));

  const json = await ret.json().then(withStatusCode(ret.status));

  if (json.status === 'SUCCESS') {
    // (await cookies()).delete(COOKIE_AUTH_TOKEN);
    // (await cookies()).delete(COOKIE_REFRESH_TOKEN);
    // revalidatePath('/', 'layout');
  }

  return json;
}
