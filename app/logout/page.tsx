"use client";



import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSessionId } from '../../context/SessionIdContext';
import { apiLogout } from '@/api/login';

import { HStack } from '@/components/basic/stack';
import Button from '@/components/basic/button';
import Link from 'next/link';

export default function LogoutPage() {
  const { setSessionId } = useSessionId();
  const route = useRouter();

  useEffect(() => {
    setTimeout(() => {
      apiLogout({}).finally(() => {
        setSessionId('logout');
        route.push('/');
      });
    }, 1);
  });

  return <main>
    <HStack className="pt-24 pb-24 pl-8 pr-8 text-center justify-center" gap="64px">
    <span className="text-xl">로그아웃 중입니다..</span>
  </HStack>
  </main>;
}


