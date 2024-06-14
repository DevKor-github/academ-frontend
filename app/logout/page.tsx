"use client";

import { redirect } from 'next/navigation';

import { useEffect } from 'react';

import { useSessionId } from '../../context/SessionIdContext';
import { apiLogout } from '@/api/login';

export default function LogoutPage() {
  const { setSessionId } = useSessionId();

  useEffect(() => {
    setTimeout(() => {
      apiLogout({}).finally(() => {
        setSessionId('');
        redirect('/');
      });
    }, 1);
  }, []);

  return <div>로그아웃 중입니다!</div>;
}
