'use client';

import { AcdApiError, NoPermissionError, NoResponseError } from '@/lib/api/errors';

import { useRouter } from 'next/navigation';
import Button from '@/components/basic/button';

function Box({ children }: React.PropsWithChildren<unknown>) {
  return <div className="md:p-8 p-2 w-full flex flex-col gap-4
  justify-center
  items-center
  [&>h3]:font-bold
  [&>h3]:text-3xl">{children}</div>;
}

function AcdApiErrorPage({ error }: ErrorProps<AcdApiError>) {
  const route = useRouter();

  if (error instanceof NoPermissionError) {
    return <Box><h3>권한이 부족합니다.</h3>
    <Button>로그인</Button></Box>;
    } else {
    return <Box><h3>알 수 없는 오류가 발생했습니다.</h3></Box>;
  }
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return error instanceof AcdApiError ? <AcdApiErrorPage error={error} reset={reset} /> : <Box />;
}
