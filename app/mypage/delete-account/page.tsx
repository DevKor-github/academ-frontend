'use client';

import { useState } from 'react';
import DeleteAccountForm, { DeleteAccountInputExtended } from './form';
import { handleInputBuilder } from '@/lib/form/handler';
import { apiDeleteAccount } from '@/lib/api/mypage';
import { useSessionId } from '@/context/SessionIdContext';
import { useRouter } from 'next/navigation';

export default function DeleteAccountClient() {
  const [jwt, setJwt] = useSessionId();

  const route = useRouter();

  const [input, setInput] = useState<DeleteAccountInputExtended>({ password: '', checked: false });

  const [busy, setBusy] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (input.password === '') {
      alert('비밀번호를 입력하세요.');
      return;
    }

    if (!input.checked) {
      alert('주의사항을 읽고 모든 항목을 체크하세요.');
      return;
    }

    setBusy(true);
    apiDeleteAccount({ password: input.password }, { token: jwt?.accessToken }).then((s) => {
      if (s.status === 'SUCCESS') {
        alert('계정이 성공적으로 삭제되었습니다.');
        setJwt(null);
        route.push('/');
      } else {
        alert(`계정 삭제에 실패했습니다: ${s.message}`);
        setBusy(false);
      }
    });
  }

  return (
    <DeleteAccountForm
      submitting={busy}
      handleInput={handleInputBuilder(input, setInput)}
      input={input}
      handleSubmit={handleSubmit}
    />
  );
}
