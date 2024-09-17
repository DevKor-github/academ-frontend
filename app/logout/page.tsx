'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSessionId } from '../../context/SessionIdContext';
import { apiLogout } from '@/lib/api/login';

export default function LogoutPage() {
  const setJWT = useSessionId()[1];
  const route = useRouter();

  useEffect(() => {
    setTimeout(() => {
      apiLogout({}).finally(() => {
        setJWT(null);
        route.push('/');
      });
    }, 0);
  }, []);

  return (
    <div className="pt-24 pb-24 pl-8 pr-8 text-center justify-center">
      <span className="text-xl">로그아웃 중입니다..</span>
    </div>
  );
}
