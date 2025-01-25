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
import { handleLoginServer } from './action';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';

export interface LoginFormState {
  error: string;
}

export default function LoginForm() {
  const qc = useQueryClient();

  const form = useForm<LoginRequest>({
    defaultValues: {
      email: '',
      password: '',
      'remember-me': false,
    },
    onSubmit: async (values) => {
      handleLoginServer(values.value).finally(() => {
        qc.invalidateQueries({ queryKey: ['loggedIn'] });
      });
    },
  });

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <HStack className="gap-y-12">
            <HStack className="gap-y-4">
              <form.Field
                name="email"
                validators={{
                  onSubmit: (value) => {
                    if (!value) {
                      return '이메일을 입력해주세요';
                    }
                  },
                }}
              >
                {(field) => (
                  <Input
                    id="email"
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    style={{ padding: '16px' }}
                  />
                )}
              </form.Field>

              <form.Field
                name="password"
                validators={{
                  onSubmit: (value) => {
                    if (!value) {
                      return '비밀번호를 입력해주세요';
                    }
                  },
                }}
              >
                {(field) => (
                  <div className="relative w-full">
                    <Input
                      id="password"
                      name="password"
                      type={showPw ? 'text' : 'password'}
                      placeholder="비밀번호를 입력해주세요"
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
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
                )}
              </form.Field>
              {/* <ErrorLabel className="text-primary-500" label={state.error} shake={shake} /> */}

              <form.Field name="remember-me">
                {(field) => (
                  <VStack className="pt-4 pb-4 items-center justify-between">
                    <Radio
                      id="remember-me"
                      name="remember-me"
                      readOnly={false}
                      // readOnly={handleInput === undefined}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.currentTarget.checked)}
                      label="로그인 정보 저장"
                    />
                    <A href="/login/reset-pw">비밀번호 초기화</A>
                  </VStack>
                )}
              </form.Field>
            </HStack>

            <HStack className="gap-y-5">
              <Button
                type="submit"
                kind="filled"
                accnet="0"
                variant="contained"
                color="primary"
                style={{ padding: '16px', width: '100%' }}
              >
                {form.state.isSubmitting ? (
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
