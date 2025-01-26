'use client';

import { useState, useCallback } from 'react';

import Button from '@/components/basic/button';
import Input from '@/components/basic/input';
import ErrorLabel from '@/components/basic/errorlabel';

import { HStack, VStack } from '@/components/basic/stack';
import { RightIcon } from '@/components/icon';
import Spinner from '@/components/basic/spinner';

import type { ReactFormExtendedApi } from '@tanstack/react-form';
import { sendEmail } from '@/app/api/register.api';
import type { SignupRequestForm } from '../types/form.types';
interface Props {
  nextStep: () => void;
  form: ReactFormExtendedApi<SignupRequestForm, undefined>;
}

export default function Step1({ nextStep, form }: Props) {
  const [loading, setLoading] = useState(false);

  const handleStepSubmit = useCallback(async () => {
    setLoading(true);
    try {
      // Validate the 'email' field
      const isValid = await form.validateField('email', 'change');

      if (!isValid) {
        return;
      }

      const response = await sendEmail({ email: form.getFieldValue('email'), purpose: 'SIGN_UP' });

      if (response.status === 'SUCCESS') {
        nextStep();
      } else {
        form.setFieldMeta('email', (meta) => ({
          ...meta,
          errors: [
            '인증번호 발송을 실패하였습니다. 잠시 후 다시 시도해주세요. 계속해서 실패하는 경우 서버 상의 문제일 수 있습니다.',
          ],
        }));
      }
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  }, [form, nextStep]);

  return (
    <HStack className="gap-y-5">
      <span className="text-4xl">환영합니다!</span>
      <span className="text-2xl">고려대학교 이메일로 학생인증을 해주세요.</span>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return handleStepSubmit();
        }}
      >
        <form.Field
          name="email"
          validators={{
            onChange: (value) => {
              return validateEmail(value.value) ? undefined : '고려대학교 이메일을 입력해주세요.';
            },
          }}
        >
          {(field) => (
            <>
              <Input
                required
                type="email"
                id="email"
                value={field.state.value}
                placeholder="example@korea.ac.kr"
                onChange={(e) => field.handleChange(e.target.value)}
                autoFocus
              />
              <ErrorLabel className="text-primary-500" label={field.state.meta.errors.join(',')} />
            </>
          )}
        </form.Field>
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
              // disabled={!isEmailValid}
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

function validateEmail(email: string) {
  const re = /^[^\s@]+@korea\.ac\.kr$/;
  return re.test(String(email).toLowerCase());
}
