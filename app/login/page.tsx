"use client";

import { redirect } from 'next/navigation';
import { useState } from 'react';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';

import { useSessionId } from '../../context/SessionIdContext';
import { VStack, HStack } from '@/components/basic/stack';
import A from '@/components/basic/a';
import Button from '@/components/basic/button';
import Radio from '@/components/basic/radio';
import TextField from '@/components/basic/textfield';
import { apiLogin } from '@/api/login';

export default function LoginPage() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const route = useRouter();


  const { setSessionId } = useSessionId();

  const [saveLoginInfo, setSaveLoginInfo] = useState(false);
  const [loginError, setLoginError] = useState(false);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  }

  async function handleLogin() { //input.email // input.password
      const a = await apiLogin({ email: input.email, password: input.password, 'remember-me': false }).then(
        (s) => {
          if (s.status === "SUCCESS") {
            window.alert('로그인이 완료되었습니다.');
            setSessionId('sesssionId from backend server');
            return route.push('/');
          }
          else {
            window.alert('로그인에 실패했습니다.');
            console.log(s.message, s.version)
            setLoginError(true);
            return;
          }
        }
      )
    
  };

  return (
    <span
    className='text-xl' 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        height: '100%',
        width: '100%',
      }}
    >
      <HStack gap="48px" style={{ width: '400px' }}>
        <span className='text-xl'  style={{ textAlign: 'center' }}>
          로그인
        </span>

        <form
          method="post"
          action="/login/api"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <HStack gap="48px">
            <HStack gap="16px">
              <TextField
                required
                id="email"
                placeholder="이메일을 입력해주세요"
                onChange={handleInput}
                value={input.email}
                style={{ padding: '16px' }}
              />
              <TextField
                required
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={handleInput}
                errorMessage={loginError ? '이메일 주소 또는 비밀번호가 일치하지 않습니다.' : ''}
                value={input.password}
                style={{ padding: '16px' }}
              />
              <VStack style={{ justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                <Radio
                  value={saveLoginInfo}
                  onClick={
                    (/* event: React.FormEvent<HTMLDivElement> */) => {
                      // event.stopPropagation();
                      setSaveLoginInfo(!saveLoginInfo);
                    }
                  }
                  label="로그인 정보 저장"
                />
                <A href="/login/find-password">비밀번호 찾기</A>
              </VStack>
            </HStack>

            <HStack style={{}} gap="20px">
              <Button
                type="submit"
                kind="filled"
                disabled={input.email === '' && input.password === ''}
                accnet="0"
                variant="contained"
                color="primary"
                style={{ padding: '16px', width: '100%' }}
              >
                <div>로그인</div>
              </Button>
              <span className='text-xl'  style={{ textAlign: 'center' }}>
                계정이 없으신가요? <A href="/register">회원가입</A>
              </span>
            </HStack>
          </HStack>
        </form>
      </HStack>
    </span>
  );
}