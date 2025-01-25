'use client';

import { useState, useEffect } from 'react';

import Button from '@/components/basic/button';
import Input from '@/components/basic/input';
import ErrorLabel from '@/components/basic/errorlabel';

import { HStack, VStack } from '@/components/basic/stack';
import { RightIcon } from '@/components/icon';
import Spinner from '@/components/basic/spinner';

import { useAnimationTimeout } from '@/lib/hooks/timeout';
import { sendEmail } from '@/app/api/register.api';
import type { SignupRequest } from '@/types/user.types';

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@korea\.ac\.kr$/;
  return re.test(String(email).toLowerCase());
};

export default function Step1({
  nextStep,
  input,
  setInput,
}: {
  nextStep: () => void;
  input: SignupRequest;
  setInput: React.Dispatch<SignupRequest>;
}) {
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
  }

  const [error, setError] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [timeout, resetTimeout] = useAnimationTimeout(500);

  useEffect(() => {
    setIsEmailValid(validateEmail(input.email));
  }, [input.email]);

  async function handleSendEmail() {
    setLoading(true);

    const response = await sendEmail({ email: input.email, purpose: 'SIGN_UP' });

    if (response.status === 'SUCCESS') {
      const id = input.email;
      setInput({ ...input, [input.email]: id });
      nextStep();
    } else {
      setError(
        '인증번호 발송을 실패하였습니다. 잠시 후 다시 시도해주세요. 계속해서 실패하는 경우 서버 상의 문제일 수 있습니다.',
      );
      resetTimeout();

      setTimeout(() => {
        setLoading(false);
        setError('');
      }, 3000);
    }
  }

  return (
    <HStack className="gap-y-5">
      <span className="text-4xl">환영합니다!</span>
      <span className="text-2xl">고려대학교 이메일로 학생인증을 해주세요.</span>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          return isEmailValid ? handleSendEmail() : () => undefined;
        }}
      >
        <Input required type="email" id="email" placeholder="example@korea.ac.kr" onChange={handleInput} autoFocus />
        <ErrorLabel className="text-primary-500" label={error} shake={timeout} />
        <VStack className="w-full h-fit justify-end gap-x-9">
          {loading ? (
            <span className="text-6xl text-primary-500">
              <Spinner />
            </span>
          ) : (
            <Button
              kind="outline"
              type="submit"
              className="flex flex-row justify-around items-center text-xl gap-x-4 px-4"
              variant="contained"
              color="primary"
              disabled={!isEmailValid}
            >
              <span>다음</span>
              <RightIcon />
            </Button>
          )}
        </VStack>
      </form>
    </HStack>
  );
}
