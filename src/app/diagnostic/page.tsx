import { APP_VERSION } from '@/data/constant';

async function checkOnline() {
  return fetch(new URL('api/is-secure', process.env.NEXT_PUBLIC_BACKEND_API_URL)).then((v) => v.json());
}

export default async function DiagnosticClient() {
  return (
    <div>
      Academ Frontend 버전: {APP_VERSION}
      <br />
      Academ Backend와의 연결 상태는 다음과 같습니다:{' '}
      {await checkOnline()
        .then((a) => a.version)
        .catch(() => '오류')}
    </div>
  );
}
