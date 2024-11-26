'use client';

import { HStack } from '@/components/basic/stack';
import Input from '@/components/basic/input';
import ErrorLabel from '@/components/basic/errorlabel';
import { VStack } from '@/components/basic/stack';
import Radio from '@/components/basic/radio';
import A from '@/components/basic/a';
import Button from '@/components/basic/button';
import Spinner from '@/components/basic/spinner';
import { useState } from 'react';
import { EyeCloseIcon, EyeIcon } from '@/components/icon';

interface LoginErrors {
  shake: boolean;
  loginError: string;
}

export default function LoginForm({
  input,
  handleInput,
  handleSubmit,
  submitting,
  loginError,
  shake,
}: FormProps<LoginRequest> & LoginErrors) {
  const [showPw, setShowPw] = useState<boolean>(false);

  return (
    <span
      className="text-xl"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        height: '100%',
        width: '100%',
      }}
    >
      <HStack className="text-lg gap-y-12" style={{ width: '400px' }}>
        <span className="text-4xl" style={{ textAlign: 'center' }}>
          로그인
        </span>
        <form method="post" onSubmit={handleSubmit}>
          <HStack className="gap-y-12">
            <HStack className="gap-y-4">
              <Input
                id="email"
                readOnly={handleInput === undefined}
                placeholder="이메일을 입력해주세요"
                onChange={handleInput}
                value={input.email}
                style={{ padding: '16px' }}
              />
              <div className="relative w-full">
                <Input
                  readOnly={handleInput === undefined}
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요"
                  onChange={handleInput}
                  value={input.password}
                  style={{ padding: '16px', width: '100%' }}
                />
                <div className="absolute top-4 right-4">
                  {showPw ? (
                    <div onClick={() => setShowPw(false)}>
                      <EyeIcon />
                    </div>
                  ) : (
                    <div onClick={() => setShowPw(true)}>
                      <EyeCloseIcon />
                    </div>
                  )}
                </div>
              </div>
              <ErrorLabel className="text-primary-500" label={loginError} shake={shake} />

              <VStack className="pt-4 pb-4 items-center justify-between">
                <Radio
                  id="remember-me"
                  readOnly={handleInput === undefined}
                  value={input['remember-me']}
                  onChange={handleInput}
                  label="로그인 정보 저장"
                />
                <A href="/login/reset-pw">비밀번호 초기화</A>
              </VStack>
            </HStack>

            <HStack className="gap-y-5">
              <Button
                type="submit"
                kind="filled"
                disabled={(input.email === '' && input.password === '') || submitting}
                accnet="0"
                variant="contained"
                color="primary"
                style={{ padding: '16px', width: '100%' }}
              >
                {submitting ? (
                  <span>
                    <Spinner /> 처리 중...
                  </span>
                ) : (
                  <div>로그인</div>
                )}
              </Button>
              <span style={{ textAlign: 'center' }}>
                계정이 없으신가요? <A href="/register">회원가입</A>
              </span>
            </HStack>
          </HStack>
        </form>
      </HStack>
    </span>
  );
}
