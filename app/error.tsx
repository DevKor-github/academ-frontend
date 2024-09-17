'use client';

import { AcdApiError, NoPermissionError, NoResponseError } from '@/lib/api/errors';

const Icon = () => (
  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="#FFD700" />

    <circle cx="70" cy="80" r="10" fill="#FFFFFF" />
    <circle cx="70" cy="80" r="5" fill="#000000" />
    <line x1="120" y1="70" x2="140" y2="90" stroke="#000000" strokeWidth="5" />
    <line x1="120" y1="90" x2="140" y2="70" stroke="#000000" strokeWidth="5" />
  </svg>
);

function Box({ children }: React.PropsWithChildren<unknown>) {
  return <div className="md:p-2 p-8">{children}</div>;
}

function AcdApiErrorPage({ error }: ErrorProps<AcdApiError>) {
  if (error instanceof NoPermissionError) {
    return <Box>로그인이 필요합니다.</Box>;
  } else if (error instanceof NoResponseError) {
    return <Box>백엔드 이상</Box>;
  } else {
    return <Box></Box>;
  }
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return error instanceof AcdApiError ? <AcdApiErrorPage error={error} reset={reset} /> : <Box />;
}
