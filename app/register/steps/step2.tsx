'use client';

import { useState } from 'react';
import { HStack, VStack } from '@/components/basic/stack';
import { RightIcon } from '@/icons';
import Input from '@/components/basic/input';
import Button from '@/components/basic/button';
import ErrorLabel from '@/components/basic/errorlabel';

import { useAnimationTimeout } from '@/lib/hooks/timeout';

import { apiCheckEmail } from '@/lib/api/login';

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

  async function handleCode() {
    try {
      const response = await apiCheckEmail({ email: input.email.split('@')[0] || '', code: input.code });

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
    } catch (e) {
      setError('인증번호 확인 도중 예기치 못한 에러가 발생하였습니다. ');
      resetTimeout();
    }
  }

  return (
    <HStack style={{ justifyContent: 'center' }} gap="20px">
      <span className="text-xl">이메일로 인증번호가 발송되었습니다.</span>
      <Input
        required
        type="text"
        id="code"
        autoComplete="one-time-code"
        inputMode="numeric"
        placeholder="인증번호를 입력해주세요"
        value={input.code}
        onChange={handleInput}
        autoFocus
      />
      <ErrorLabel className={'text-primary-500 '} label={error} shake={timeout} />
      <VStack className="w-full h-fit justify-end" gap="36px">
        <Button
          kind="outline"
          className="flex flex-row justify-around items-center text-xl gap-x-4 px-4"
          variant="contained"
          color="primary"
          disabled={input.code === ''}
          onClick={handleCode}
        >
          <span>다음</span>
          <RightIcon />
        </Button>
      </VStack>
    </HStack>
  );
}
