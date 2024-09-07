'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSessionId } from '../../context/SessionIdContext';
import { apiLogin, apiCheckLogin } from '@/lib/api/login';

import { useAnimationTimeout } from '@/lib/hooks/timeout';

import { keyForStorage } from '../../context/SessionIdContext';

import LoginForm from './form';
import { handleInputBuilder } from '@/lib/form/handler';

export default function LoginPageClient() {
  const [input, setInput] = useState<LoginRequest>({
    email: '',
    password: '',
    'remember-me': false,
  });

  const route = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSessionId] = useSessionId();
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

    await apiLogin({ email: input.email, password: input.password, 'remember-me': false }).then((s) => {
      if (s.status === 'SUCCESS') {
        apiCheckLogin({}, { token: s.data.accessToken }).then((a) => {
          if (a.status === 'SUCCESS') {
            setSessionId(s.data);
            localStorage.setItem(keyForStorage, JSON.stringify(s.data));
            return route.push('/');
          } else {
            setLoginError(
              '로그인을 완료하였으나 사용자 정보 획득에 실패하였습니다. 이 상황은 일반적이지 않습니다. 다시 시도해주세요.',
            );
            resetShake();
            setSessionId(null);
            setLoading(false);
          }
        });
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
