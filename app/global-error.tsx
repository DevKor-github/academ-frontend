'use client';

import {
  AcdApiError,
  LoginRequiredError,
  NoPermissionError,
  NoRequestError,
  NoResponseError,
} from '@/lib/api-client/errors';

import { useRouter } from 'next/navigation';
import Button from '@/component/basic/button';

function Box({ children }: React.PropsWithChildren<unknown>) {
  return (
    <div
      className="md:p-8 p-2 w-full min-h-full flex flex-col gap-12
  justify-center
  items-center
  [&>h3]:font-bold
  [&>h3]:text-3xl"
    >
      {children}
    </div>
  );
}

function AcdApiErrorPage({ error, reset }: ErrorProps<AcdApiError>) {
  const route = useRouter();

  if (error instanceof LoginRequiredError) {
    return (
      <Box>
        <h3>이 페이지를 보려면 로그인해야 합니다.</h3>
        <Button onClick={() => route.push('/login')}>로그인</Button>
      </Box>
    );
  } else if (error instanceof NoPermissionError) {
    return (
      <Box>
        <h3>권한이 부족합니다.</h3>
        <Button onClick={() => route.push('/login')}>로그인</Button>
        <Button onClick={reset}>재시도</Button>
      </Box>
    );
  } else if (error instanceof NoResponseError) {
    return (
      <Box>
        <h3>Academ 백엔드 서버가 응답하지 않았습니다.</h3>
        <p>서버에 문제가 있거나 기기가 오프라인입니다.</p>
        <Button onClick={reset}>재시도</Button>
      </Box>
    );
  } else if (error instanceof NoRequestError) {
    return (
      <Box>
        <h3>요청을 전송하지 못했습니다.</h3>
        <p>기기가 오프라인인 것 같습니다.</p>
        <Button onClick={reset}>재시도</Button>
      </Box>
    );
  } else {
    return (
      <Box>
        <h3>알 수 없는 오류가 발생했습니다.</h3>
      </Box>
    );
  }
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return error instanceof AcdApiError ? <AcdApiErrorPage error={error} reset={reset} /> : <Box />;
}
