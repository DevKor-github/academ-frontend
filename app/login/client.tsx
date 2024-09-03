'use client';

import A from '@/components/basic/a';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HStack, VStack } from '@/components/basic/stack';
import { useSessionId } from '../../context/SessionIdContext';

import Button from '@/components/basic/button';
import Radio from '@/components/basic/radio';
import Input from '@/components/basic/input';
import { apiLogin, apiCheckLogin } from '@/lib/api/login';
import ErrorLabel from '@/components/basic/errorlabel';

import { useAnimationTimeout } from '@/lib/hooks/timeout';

import { keyForStorage } from '../../context/SessionIdContext';
import Spinner from '@/components/basic/spinner';

export default function LoginPageClient() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const route = useRouter();

  const [_, setSessionId] = useSessionId();
  const [shake, resetShake] = useAnimationTimeout(600);
  const [loading, setLoading] = useState<boolean>(false);


  const [saveLoginInfo, setSaveLoginInfo] = useState(false);
  const [loginError, setLoginError] = useState('');

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  }

  async function handleLogin() {
    //input.email // input.password

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
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <HStack gap="48px">
        <HStack gap="16px">
          <Input
            // required
            id="email"
            placeholder="이메일을 입력해주세요"
            onChange={handleInput}
            value={input.email}
            style={{ padding: '16px' }}
          />
          <Input
            // required 
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleInput}
            value={input.password}
            style={{ padding: '16px' }}
          />
          <ErrorLabel className="text-primary-500" label={loginError} shake={shake} />

          <VStack className="pt-4 pb-4 items-center justify-between">
            <Radio
              id="save"
              value={saveLoginInfo}
              onChange={
                (/* event: React.FormEvent<HTMLDivElement> */) => {
                  // event.stopPropagation();
                  setSaveLoginInfo(!saveLoginInfo);
                }
              }
              label="로그인 정보 저장"
            />
            <A href="/login/reset-pw">비밀번호 초기화</A>
          </VStack>
        </HStack>

        <HStack style={{}} gap="20px">
          <Button
            type="submit"
            kind="filled"
            disabled={(input.email === '' && input.password === '') || loading}
            accnet="0"
            variant="contained"
            color="primary"
            style={{ padding: '16px', width: '100%' }}
          >
            {loading ? <span><Spinner /> 처리 중...</span> : <div>로그인</div>}
          </Button>
          <span style={{ textAlign: 'center' }}>
            계정이 없으신가요? <A href="/register">회원가입</A>
          </span>
        </HStack>
      </HStack>
    </form>
  );
}
