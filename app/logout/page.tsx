'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSessionId } from '../../context/SessionIdContext';
import { apiLogout } from '@/lib/api/login';

import { HStack } from '@/components/basic/stack';

export default function LogoutPage() {
  const [_, setJWT] = useSessionId();
  const route = useRouter();

  useEffect(() => {
    setTimeout(() => {
      apiLogout({}).finally(() => {
        setJWT(null);
        route.push('/');
      });
    }, 1);
  });

  return (
    <main>
      {' '}
      <HStack className="pt-24 pb-24 pl-8 pr-8 text-center justify-center" gap="64px">
        <span className="text-xl">로그아웃 중입니다..</span>
      </HStack>
    </main>
  );
}
