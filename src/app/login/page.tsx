'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import LoginForm from './form';

import { useAuthTokens } from '@/lib/context/AuthTokensContext';
import { apiLogin } from '@/lib/api-client/calls/login';
import { useAnimationTimeout } from '@/lib/hooks/timeout';
import { handleInputBuilder } from '@/lib/form/handler';

export default function LoginPageClient() {
  const [input, setInput] = useState<LoginRequest>({
    email: '',
    password: '',
    'remember-me': false,
  });

  const route = useRouter();

  const [{ instances }, setAccessToken, setRefreshToken] = useAuthTokens();
  const [loading, setLoading] = useState<boolean>(false);

  const [loginError, setLoginError] = useState('');
  const [shake, resetShake] = useAnimationTimeout(600);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (input.email === '' || input.password === '') {
      setLoginError('이메일 및 비밀번호를 모두 입력하세요.');
      resetShake();
      setLoading(false);
      return;
    }

    await apiLogin(instances.basic, input).then((s) => {
      if (s.status === 'SUCCESS') {
        // intended order
        setRefreshToken(s.data.refreshToken);
        setAccessToken(s.data.accessToken);
        return route.push('/');
      } else if (s.status === 'ERROR') {
        setLoginError('로그인에 실패했습니다. 없는 계정이거나 비밀번호가 일치하지 않습니다.');
        resetShake();
        setLoading(false);
      } else {
        setLoginError(s.message);
        resetShake();
        setLoading(false);
      }
    });
  }

  return (
    <LoginForm
      input={input}
      handleInput={handleInputBuilder(input, setInput)}
      handleSubmit={handleLogin}
      submitting={loading}
      loginError={loginError}
      shake={shake}
    />
  );
}
