'use client';

import { useState } from 'react';
import { HStack, VStack } from '@/components/basic/stack';
import { RightIcon } from '@/components/icon';
import Input from '@/components/basic/input';
import Button from '@/components/basic/button';
import ErrorLabel from '@/components/basic/errorlabel';

import { useAnimationTimeout } from '@/lib/hooks/timeout';

import { apiCheckEmail } from '@/lib/api-client/calls/login';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';

export default function Step2({
  nextStep,
  input,
  setInput,
}: {
  nextStep: () => void;
  input: SignupRequest;
  setInput: React.Dispatch<SignupRequest>;
}) {
  const [error, setError] = useState<string>('');
  const [timeout, resetTimeout] = useAnimationTimeout(200);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInput({ ...input, code: value });
  }

  const [{ instances }] = useAuthTokens();

  async function handleCode() {
    const response = await apiCheckEmail(instances.basic, { email: input.email, code: input.code });

    if (response.status === 'SUCCESS') {
      nextStep();
    } else if (response.status === 'ERROR' && response.statusCode === 400) {
      setError(response.message);
      resetTimeout();
    } else {
      alert(response.message);
      setError('인증번호 처리에 실패하였습니다.');
      resetTimeout();
    }
  }

  return (
    <HStack className="justify-center gap-y-5">
      <span className="text-xl">이메일로 인증번호가 발송되었습니다.</span>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleCode();
        }}
      >
        <Input
          required
          type="text"
          id="code"
          autoComplete="one-time-code"
          inputMode="numeric"
          maxLength={8}
          placeholder="인증번호를 입력해주세요"
          value={input.code}
          onChange={handleInput}
          autoFocus
        />
        <ErrorLabel className={'text-primary-500 '} label={error} shake={timeout} />
        <VStack className="w-full h-fit justify-end gap-x-9">
          <Button
            kind="outline"
            type="submit"
            className="flex flex-row justify-around items-center text-xl gap-x-4 px-4"
            variant="contained"
            color="primary"
            disabled={input.code === ''}
          >
            <span>다음</span>
            <RightIcon />
          </Button>
        </VStack>
      </form>
    </HStack>
  );
}
