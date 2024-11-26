'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthTokens } from '@/lib/context/AuthTokensContext';
import { apiLogout } from '@/lib/api-client/calls/login';

export default function LogoutPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ instances }, setAccessToken, setRefreshToken] = useAuthTokens();
  const route = useRouter();

  useEffect(() => {
    setTimeout(() => {
      apiLogout(instances.doRefresh, {}).finally(() => {
        setAccessToken(null);
        setRefreshToken(null);
        route.push('/');
      });
    }, 0);
  }, [instances.doRefresh, setAccessToken, setRefreshToken, route]);

  return (
    <div className="pt-24 pb-24 pl-8 pr-8 text-center justify-center">
      <span className="text-xl">로그아웃 중입니다..</span>
    </div>
  );
}
