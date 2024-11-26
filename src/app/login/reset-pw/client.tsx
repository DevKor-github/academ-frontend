'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { apiResetPassword } from '@/lib/api-client/calls/login';
import { apiSendEmail } from '@/lib/api-client/calls/login';
import ResetPwForm1 from './inner/form1';
import ResetPwForm2 from './inner/form2';
import { handleInputBuilder } from '@/lib/form/handler';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';

export default function FindPWPageClient() {
  const [{ instances }] = useAuthTokens();
  const [input, setInput] = useState<ResetPwReq>({
    email: '',
    code: '',
  });

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [wip, setWip] = useState<boolean>(false); // wip means working in progress; 'application is busy'

  const route = useRouter();

  function handleSendcode(e: React.FormEvent) {
    e.preventDefault();
    setWip(true);
    apiSendEmail(instances.basic, { email: input.email, purpose: 'RESET_PASSWORD' }).then((s) => {
      if (s.status === 'SUCCESS') {
        setStep(2);
        setWip(false);
      } else {
        alert(s.message);
        setWip(false);
      }
    });
  }

  function handleResetPw(e: React.FormEvent) {
    e.preventDefault();
    setWip(true);
    apiResetPassword(instances.doRefresh, { email: input.email, code: input.code }).then((s) => {
      if (s.status === 'SUCCESS') {
        alert('비밀번호를 성공적으로 초기화했습니다. 이메일로 발급된 임시 비밀번호로 로그인해주세요.');
        route.push('/login');
      } else {
        alert(s.message);
        setWip(false);
      }
    });
  }

  return step === 1 ? (
    <ResetPwForm1
      input={input}
      handleInput={handleInputBuilder(input, setInput)}
      handleSubmit={handleSendcode}
      submitting={wip}
    />
  ) : (
    <ResetPwForm2
      input={input}
      handleInput={handleInputBuilder(input, setInput)}
      handleSubmit={handleResetPw}
      submitting={wip}
    />
  );
}
