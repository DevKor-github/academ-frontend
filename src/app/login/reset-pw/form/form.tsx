'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { resetPW } from '@/app/api/register.api';
import { sendEmail } from '@/app/api/register.api';
import ResetPwForm1 from './form1';
import ResetPwForm2 from './form2';
import { useForm } from '@tanstack/react-form';
import type { ResetPwReq } from '@/types/user.types';

export default function FindPWPageClient() {
  const router = useRouter();

  const form = useForm<ResetPwReq>({
    defaultValues: { email: '', code: '' },
    onSubmit: async (value) => {
      resetPW({ email: value.value.email, code: value.value.code }).then((s) => {
        if (s.status === 'SUCCESS') {
          alert('비밀번호를 성공적으로 초기화했습니다. 이메일로 발급된 임시 비밀번호로 로그인해주세요.');
          router.push('/login');
        } else {
          alert(s.message);
        }
      });
    },
  });

  const [step, setStep] = useState<1 | 2>(1);

  const sendCode = useCallback(function handleSendcode(f: typeof form) {
    sendEmail({ email: f.getFieldValue('email'), purpose: 'RESET_PASSWORD' }).then((s) => {
      if (s.status === 'SUCCESS') {
        setStep(2);
      } else {
        alert(s.message);
      }
    });
  }, []);

  return step === 1 ? <ResetPwForm1 form={form} sendCode={sendCode} /> : <ResetPwForm2 form={form} />;
}
