'use client';

import { HStack } from '@/components/basic/stack';
import Input from '@/components/basic/input';
import { VStack } from '@/components/basic/stack';
import Spinner from '@/components/basic/spinner';
import { handleLoginServer } from './action';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import type { LoginRequest } from '@/types/user.types';
import Link from 'next/link';
import { a } from '@/styles/a';
import PWInput from '@/components/input/pw-input';
import Checkbox from '@/components/input/checkbox';
import { filledButton } from '@/styles/button';

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
        qc.resetQueries();
      });
    },
  });

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
                {(field) => <PWInput value={field.state.value} setValue={field.handleChange} />}
              </form.Field>
              {/* <ErrorLabel className="text-primary-500" label={state.error} shake={shake} /> */}

              <form.Field name="remember-me">
                {(field) => (
                  <VStack className="pt-4 pb-4 items-center justify-between">
                    <Checkbox label="로그인 정보 저장" value={field.state.value} setValue={field.handleChange} />
                    <Link className={a({ style: 'accent' })} href="/login/reset-pw">
                      비밀번호 초기화
                    </Link>
                  </VStack>
                )}
              </form.Field>
            </HStack>

            <HStack className="gap-y-5">
              <button type="submit" className={filledButton({ disabled: false })} >
                {form.state.isSubmitting ? (
                  <span>
                    <Spinner /> 처리 중...
                  </span>
                ) : (
                  <div>로그인</div>
                )}
              </button>
              <span style={{ textAlign: 'center' }}>
                계정이 없으신가요?{' '}
                <Link className={a({ style: 'accent' })} href="/register">
                  회원가입
                </Link>
              </span>
            </HStack>
          </HStack>
        </form>
      </HStack>
    </span>
  );
}
