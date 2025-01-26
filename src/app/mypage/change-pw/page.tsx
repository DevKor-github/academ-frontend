'use client';

import Button from '@/components/basic/button';
import ErrorLabel from '@/components/basic/errorlabel';
import Spinner from '@/components/basic/spinner';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { MyPageUpdatePW } from '@/app/api/mypage.api';
import { conform, type UpdatePWForm } from './form.types';
import PWInput from '@/components/input/pw-input';

export default function ChangePWForm() {
  const router = useRouter();

  const form = useForm<UpdatePWForm>({
    defaultValues: {
      old_password: '',
      new_password: '',
      new_password_check: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      await MyPageUpdatePW(conform(value)).then((s) => {
        if (s.status === 'SUCCESS') {
          alert(`비밀번호 변경에 성공했습니다.`);
          router.push('/mypage?pwchanged');
        } else {
          alert(`변경에 실패했습니다: ${s.message}`);
        }
      });
    },
  });

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
        {(field) => <PWInput value={field.state.value} setValue={field.handleChange} />}
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
            <PWInput value={field.state.value} setValue={field.handleChange} />
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
            <PWInput value={field.state.value} setValue={field.handleChange} />
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
