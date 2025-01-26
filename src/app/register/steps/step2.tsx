'use client';

import { useCallback } from 'react';
import { HStack, VStack } from '@/components/basic/stack';
import { RightIcon } from '@/components/icon';
import Input from '@/components/basic/input';
import Button from '@/components/basic/button';
import ErrorLabel from '@/components/basic/errorlabel';
import { checkEmail } from '@/app/api/register.api';

import type { ReactFormExtendedApi } from '@tanstack/react-form';
import type { SignupRequestForm } from '../types/form.types';

interface Props {
  nextStep: () => void;
  form: ReactFormExtendedApi<SignupRequestForm, undefined>;
}

export default function Step2({ nextStep, form }: Props) {
  const handleStep = useCallback(
    async function () {
      const response = await checkEmail({ email: form.getFieldValue('email'), code: form.getFieldValue('code') });

      if (response.status === 'SUCCESS') {
        nextStep();
      } else if (response.status === 'ERROR' && response.statusCode === 400) {
        form.setErrorMap({ onSubmit: response.message });
      } else {
        form.setErrorMap({ onSubmit: response.message });
      }
    },
    [form, nextStep],
  );

  return (
    <HStack className="justify-center gap-y-5">
      <span className="text-xl">이메일로 인증번호가 발송되었습니다.</span>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleStep();
        }}
      >
        <form.Field name="code">
          {(field) => (
            <>
              <Input
                required
                type="text"
                id="code"
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={8}
                placeholder="인증번호를 입력해주세요"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                autoFocus
              />
              <ErrorLabel className={'text-primary-500 '} label={field.state.meta.errors.join(',')} />
            </>
          )}
        </form.Field>
        <VStack className="w-full h-fit justify-end gap-x-9">
          <Button
            kind="outline"
            type="submit"
            className="flex flex-row justify-around items-center text-xl gap-x-4 px-4"
            variant="contained"
            color="primary"
            disabled={form.getFieldValue('code') === ''}
          >
            <span>다음</span>
            <RightIcon />
          </Button>
        </VStack>
      </form>
    </HStack>
  );
}
