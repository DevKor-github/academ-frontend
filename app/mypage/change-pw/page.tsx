'use client';

import { apiProfileUpdatePW } from '@/lib/api/calls/mypage';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import ChangePwForm from './form';
import { handleInputBuilder } from '@/lib/form/handler';

export default function ChangePW() {
  const [input, setInput] = useState<UpdatePWExtended>({ old_password: '', new_password: '', new_password_check: '' });

  const [busy, setBusy] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const validatePw = (pw: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,24}$/;
    return re.test(String(pw));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);

    if (!validatePw(input.new_password)) {
      setBusy(false);
      setError(true);
      return alert('영문자, 숫자, 또는 특수문자로 이루어진 8 - 24 자리의 비밀번호를 입력해주세요.');
    }

    if (input.new_password !== input.new_password_check) {
      setBusy(false);
      return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    apiProfileUpdatePW({ old_password: input.old_password, new_password: input.new_password }).then((s) => {
      if (s.status === 'SUCCESS') {
        alert(`비밀번호 변경에 성공했습니다.`);
        router.push('/mypage?pwchanged');
      } else {
        alert(`변경에 실패했습니다: ${s.message}`);
      }
    });
    setBusy(false);
  }

  return (
    <ChangePwForm
      handleSubmit={handleSubmit}
      handleInput={handleInputBuilder(input, setInput)}
      input={input}
      submitting={busy}
      error={error}
    />
  );
}
