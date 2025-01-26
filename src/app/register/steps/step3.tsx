'use client';

import { useCallback } from 'react';

import { HStack, VStack } from '@/components/basic/stack';
import { duplicateName, signUp } from '@/app/api/register.api';
import Button from '@/components/basic/button';
import Input from '@/components/basic/input';

import ErrorLabel from '@/components/basic/errorlabel';

import { departments } from '@/data/departments';
import PWInput from '@/components/input/pw-input';
import DepartmentInput from '@/components/input/department-Input';
import type { ReactFormExtendedApi } from '@tanstack/react-form';
import { conform, type SignupRequestForm } from '../types/form.types';

interface Props {
  nextStep: () => void;
  form: ReactFormExtendedApi<SignupRequestForm, undefined>;
}

export default function Step3({ nextStep, form }: Props) {
  const handleNextStep = useCallback(
    async function () {
      const valid = (await form.validateAllFields('change')) && (await form.validateAllFields('submit'));

      if (!valid) {
        form.setErrorMap({
          onSubmit: `회원가입에 실패했습니다. 입력값을 확인해주세요.`,
        });
        return;
      }

      const response = await signUp(conform(form.state.values));

      if (response.status === 'SUCCESS') {
        nextStep();
      } else {
        form.setErrorMap({
          onSubmit: `회원가입에 실패했습니다. ${response.message}`,
        });
      }
    },
    [form, nextStep],
  );

  return (
    <HStack className="gap-y-5">
      <span className="text-4xl">회원가입</span>
      <span className="text-xl" style={{ marginBottom: '60px' }}>
        ACADEM에 오신걸 환영합니다!
        <br />
        회원 정보를 입력해주세요.
      </span>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleNextStep();
        }}
      >
        <span className="text-xl">아이디</span>
        <form.Field name="email">
          {(field) => (
            <Input
              required
              type="email"
              id="email"
              autoComplete="username"
              value={field.state.value}
              onChange={() => console.warn('changing email is not allowed here')}
              disabled={true}
              style={{ width: '100%' }}
            />
          )}
        </form.Field>
        <span className="text-xl">비밀번호</span>
        <form.Field
          name="password"
          validators={{
            onChange: (value) => {
              if (value.value === '') return '비밀번호를 입력해주세요.';
              return validatePw(value.value)
                ? undefined
                : '영문자, 숫자, 또는 특수문자로 이루어진 8 - 24 자리의 비밀번호를 입력해주세요.';
            },
          }}
        >
          {(field) => (
            <>
              <PWInput
                value={field.state.value}
                setValue={field.handleChange}
                inputProps={{
                  id: 'password',
                  autoComplete: 'new-password',
                  placeholder: '비밀번호를 입력해주세요',
                  className: 'w-full',
                  maxLength: 24,
                }}
              />
              <ErrorLabel label={field.state.meta.errors.join(', ')} />
            </>
          )}
        </form.Field>
        <span className="text-xl">비밀번호 확인</span>
        <form.Field
          name="passwordCheck"
          validators={{
            onChange: (value) => {
              return value.value === form.getFieldValue('password') ? undefined : '비밀번호가 일치하지 않습니다.';
            },
          }}
        >
          {(field) => (
            <>
              <PWInput
                value={field.state.value}
                setValue={field.handleChange}
                inputProps={{
                  id: 'pwcheck',
                  autoComplete: 'new-password',
                  placeholder: '비밀번호를 다시 입력해주세요',
                  className: 'w-full',
                  maxLength: 24,
                }}
              />
              <ErrorLabel label={field.state.meta.errors.join(',')} />
            </>
          )}
        </form.Field>
        <span className="text-xl" style={{ marginTop: '10px' }}>
          닉네임
        </span>
        <form.Field
          name="username"
          validators={{
            onSubmitAsync: async (value) => {
              return validateDuplicateUsername(value.value).then((result) => {
                if (result) {
                  alert(result);
                }
                return result;
              });
            },
          }}
        >
          {(field) => (
            <>
              <VStack className="gap-x-5 w-100% justify-between">
                <div className="grow">
                  <Input
                    required
                    type="text"
                    id="username"
                    autoComplete={undefined}
                    placeholder="닉네임 (1-10자)"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    maxLength={10}
                    className="w-full"
                  />
                </div>
              </VStack>
              <ErrorLabel label={field.state.meta.errors.join(',')} />
            </>
          )}
        </form.Field>
        <span className="text-xl">학번</span>
        <form.Field
          name="student_id"
          validators={{
            onChange: (value) => {
              return validateStudentNum(value.value) ? undefined : '학번 앞 7자를 입력해주세요.';
            },
          }}
        >
          {(field) => (
            <>
              <Input
                required
                type="text"
                id="student_id"
                placeholder="학번"
                maxLength={7}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                style={{ width: '100%' }}
              />
              <ErrorLabel label={field.state.meta.errors.join(',')} />
            </>
          )}
        </form.Field>
        <span className="text-xl">학과</span>
        <form.Field
          name="department"
          validators={{
            onChange: (value) => {
              return departments.includes(value.value) ? undefined : '유효한 학과명을 입력해주세요.';
            },
          }}
        >
          {(field) => (
            <>
              <DepartmentInput value={field.state.value} setValue={field.handleChange} />
            </>
          )}
        </form.Field>
        <span className="text-xl">학위 / 학기</span>
        <VStack style={{ justifyContent: 'space-between', marginBottom: '40px' }}>
          <form.Field name="degree">
            {(field) => (
              <VStack className="gap-x-3">
                <Button
                  id="degree"
                  type="button"
                  kind={field.state.value === 'MASTER' ? 'filled' : 'outline'}
                  variant="contained"
                  color="primary"
                  onClick={() => field.handleChange('MASTER')}
                >
                  <span className="text-xl" style={{ margin: '5px 30px' }}>
                    석사
                  </span>
                </Button>
                <Button
                  id="degree"
                  type="button"
                  kind={field.state.value === 'DOCTOR' ? 'filled' : 'outline'}
                  variant="contained"
                  color="primary"
                  onClick={() => field.handleChange('DOCTOR')}
                >
                  <span className="text-xl" style={{ margin: '5px 30px' }}>
                    박사
                  </span>
                </Button>
              </VStack>
            )}
          </form.Field>
          <form.Field
            name="semester"
            validators={{
              onChange: (value) => {
                return value.value !== 0 ? undefined : '학기를 입력해주세요.';
              },
            }}
          >
            {(field) => (
              <VStack className="gap-x-3 items-center">
                <Input
                  required
                  type="number"
                  id="semester"
                  style={{ width: '60px', textAlign: 'center' }}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                <span className="text-xl">학기</span>
              </VStack>
            )}
          </form.Field>
        </VStack>
        <ErrorLabel label={form.state.errors.join(',')} />
        <Button kind="filled" type="submit" variant="contained" color="primary">
          <span className="text-xl">완료</span>
        </Button>
      </form>
    </HStack>
  );
}

async function validateDuplicateUsername(username: string) {
  const response = await duplicateName({ username });

  if (response.status === 'SUCCESS') {
    return undefined;
  } else {
    return '해당 닉네임은 이미 사용 중입니다.';
  }
}

const validatePw = (pw: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,24}$/;
  return re.test(String(pw));
};

const validateStudentNum = (num: string) => {
  const re = /^[A-Za-z\d]{7}$/;
  return re.test(String(num));
};
