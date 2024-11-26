'use client';

import { HStack } from '@/components/basic/stack';
import Input from '@/components/basic/input';
import ErrorLabel from '@/components/basic/errorlabel';
import { VStack } from '@/components/basic/stack';
import Radio from '@/components/basic/radio';
import A from '@/components/basic/a';
import Button from '@/components/basic/button';
import Spinner from '@/components/basic/spinner';
import { useEffect, useState } from 'react';
import { EyeCloseIcon, EyeIcon } from '@/components/icon';
import Form from 'next/form';
import { handleLoginServer } from './action';
import { useActionState } from 'react';
interface LoginErrors {
  shake: boolean;
  loginError: string;
}

export const newHandleInputBuilder = <State,>(
  setInput: SetState<State>,
  type: 'BOOLEAN' | 'STRING' | 'NUMBER',
): InputHandler =>
  function handleInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    switch (type) {
      case 'BOOLEAN':
        setInput((input) => ({
          ...input,
          [event.target.name]: (event.target as HTMLInputElement).checked,
        }));
        break;
      case 'STRING':
        setInput((input) => ({
          ...input,
          [event.target.name]: event.target.value,
        }));
        break;
      case 'NUMBER':
        setInput((input) => ({
          ...input,
          [event.target.name]: Number(event.target.value),
        }));
        break;
    }
  };

export interface LoginFormState {
  error: string;
}

const formState: LoginFormState = {
  error: '',
};

import { useAnimationTimeout } from '@/lib/hooks/timeout';

export default function LoginForm() {
  const [showPw, setShowPw] = useState<boolean>(false);

  const [input, setInput] = useState<LoginRequest>({
    email: '',
    password: '',
    'remember-me': false,
  });

  const [state, formAction, isPending] = useActionState(handleLoginServer, formState);
  const [shake, resetShake] = useAnimationTimeout(600);

  useEffect(() => {
    if (state.error) {
      resetShake();
    }
  }, [state]);

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
        <Form action={formAction} disabled={isPending}>
          <HStack className="gap-y-12">
            <HStack className="gap-y-4">
              <Input
                id="email"
                name="email"
                placeholder="이메일을 입력해주세요"
                onChange={newHandleInputBuilder(setInput, 'STRING')}
                value={input.email}
                style={{ padding: '16px' }}
              />
              <div className="relative w-full">
                <Input
                  id="password"
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요"
                  onChange={newHandleInputBuilder(setInput, 'STRING')}
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
              <ErrorLabel className="text-primary-500" label={state.error} shake={shake} />

              <VStack className="pt-4 pb-4 items-center justify-between">
                <Radio
                  id="remember-me"
                  name="remember-me"
                  readOnly={false}
                  // readOnly={handleInput === undefined}
                  value={input['remember-me']}
                  onChange={newHandleInputBuilder(setInput, 'BOOLEAN')}
                  label="로그인 정보 저장"
                />
                <A href="/login/reset-pw">비밀번호 초기화</A>
              </VStack>
            </HStack>

            <HStack className="gap-y-5">
              <Button
                type="submit"
                kind="filled"
                disabled={(input.email === '' && input.password === '') || isPending}
                accnet="0"
                variant="contained"
                color="primary"
                style={{ padding: '16px', width: '100%' }}
              >
                {isPending ? (
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
        </Form>
      </HStack>
    </span>
  );
}
