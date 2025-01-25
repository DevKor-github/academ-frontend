'use client';

import Button from '@/components/basic/button';
import ErrorLabel from '@/components/basic/errorlabel';
import Input from '@/components/basic/input';
import Spinner from '@/components/basic/spinner';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { MyPageUpdatePW } from '@/app/api/mypage.api';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function ChangePWForm() {
  const router = useRouter();

  const form = useForm<UpdatePWExtended>({
    defaultValues: {
      old_password: '',
      new_password: '',
      new_password_check: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      await MyPageUpdatePW({
        old_password: value.old_password,
        new_password: value.new_password,
      }).then((s) => {
        if (s.status === 'SUCCESS') {
          alert(`비밀번호 변경에 성공했습니다.`);
          router.push('/mypage?pwchanged');
        } else {
          alert(`변경에 실패했습니다: ${s.message}`);
        }
      });
    },
  });

  const inputFields = [
    { label: '기존 비밀번호', name: 'oldPassword' },
    { label: '새 비밀번호', name: 'newPassword' },
    { label: '새 비밀번호 확인', name: 'newPasswordConfirm' },
  ];

  const [showPw, setShowPw] = useState<boolean[]>(inputFields.map(() => false));

  const onToggleShow = (index: number) => {
    setShowPw((prev) => {
      const newHide = [...prev];
      newHide[index] = !newHide[index];
      return newHide;
    });
  };

  return (
    <form
      className="py-8 h-full transition-all self-center justify-center items-start pl-2 pr-2 flex flex-col gap-4 w-11/12 md:w-1/2"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <span className="pl-8 pr-8 font-bold text-2xl self-center">비밀번호 수정</span>

      <span className="text-xl mx-2 mt-4">기존 비밀번호</span>

      <form.Field name="old_password">
        {(field) => (
          <div className="relative w-full">
            <Input
              required
              id="old_password"
              type={showPw[0] ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="기존 비밀번호"
              className="bg-base-32 dark:bg-base-2 p-4 rounded-2xl w-full"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              maxLength={24}
            />
            <div className="absolute top-4 right-4">
              {showPw[0] ? (
                <div onClick={() => onToggleShow(0)}>
                  <EyeIcon />
                </div>
              ) : (
                <div onClick={() => onToggleShow(0)}>
                  <EyeOffIcon />
                </div>
              )}
            </div>
          </div>
        )}
      </form.Field>

      {/* <ErrorLabel
        label={error ? '영문자, 숫자, 또는 특수문자로 이루어진 8 - 24 자리의 비밀번호를 입력해주세요.' : ''}
      /> */}

      <span className="text-xl mx-2 mt-4">새 비밀번호</span>
      <form.Field
        name="new_password"
        validators={{
          onChange: (value) => {
            if (!validatePw(value.value)) {
              return '영문자, 숫자, 또는 특수문자로 이루어진 8 - 24 자리의 비밀번호를 입력해주세요.';
            }
          },
        }}
      >
        {(field) => (
          <>
            <div className="relative w-full">
              <Input
                required
                id="new_password"
                autoComplete="new-password"
                type={showPw[1] ? 'text' : 'password'}
                placeholder="새 비밀번호"
                value={field.state.value}
                className="bg-base-32 dark:bg-base-2-back-2 p-4 rounded-2xl w-full"
                onChange={(e) => field.handleChange(e.target.value)}
                maxLength={24}
              />
              <div className="absolute top-4 right-4">
                {showPw[1] ? (
                  <div onClick={() => onToggleShow(1)}>
                    <EyeIcon />
                  </div>
                ) : (
                  <div onClick={() => onToggleShow(1)}>
                    <EyeOffIcon />
                  </div>
                )}
              </div>
            </div>
            {field.state.meta.errors ? <ErrorLabel label={field.state.meta.errors.join(', ')} /> : null}
          </>
        )}
      </form.Field>

      <span className="text-xl mx-2 mt-4">새 비밀번호 확인</span>

      <form.Field
        name="new_password_check"
        validators={{
          onChange: (value) => {
            if (value.value !== value.fieldApi.form.getFieldValue('new_password')) {
              return '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
            }
          },
        }}
      >
        {(field) => (
          <>
            <div className="relative w-full">
              <Input
                required
                type={showPw[2] ? 'text' : 'password'}
                id="new_password_check"
                autoComplete="new-password"
                placeholder="새 비밀번호 확인"
                value={field.state.value}
                className="bg-base-32 dark:bg-base-2 p-4 rounded-2xl w-full"
                onChange={(e) => field.handleChange(e.target.value)}
                maxLength={24}
              />
              <div className="absolute top-4 right-4">
                {showPw[2] ? (
                  <div onClick={() => onToggleShow(2)}>
                    <EyeIcon />
                  </div>
                ) : (
                  <div onClick={() => onToggleShow(2)}>
                    <EyeOffIcon />
                  </div>
                )}
              </div>
            </div>
            {field.state.meta.errors ? <ErrorLabel label={field.state.meta.errors.join(', ')} /> : null}
          </>
        )}
      </form.Field>

      <Button
        className="w-full mt-4"
        disabled={
          // submitting || input.old_password === '' || input.new_password === '' || input.new_password_check === ''
          false
        }
        kind="filled"
        type="submit"
      >
        {form.state.isSubmitting ? <Spinner /> : '비밀번호 변경'}
      </Button>
    </form>
  );
}

const validatePw = (pw: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,24}$/;
  return re.test(String(pw));
};
