'use client';

import { apiProfileUpdatePW, UpdatePWReq, UpdatePWExtended } from '@/lib/api/mypage';
import { useState } from 'react';
import Submitted from './inner/submitted';
import { useSessionId } from '@/context/SessionIdContext';
import { retryWithJWTRefresh } from '@/lib/api/authHelper';

import UpdateBasicForm from './inner/form';

export default function ChangePW() {
  const [input, setInput] = useState<UpdatePWExtended>({ password: '', password_check: '' });

  const [submitted, setSubmitted] = useState<boolean | null>(null);

  const sessionIdState = useSessionId();

  function handleSubmit(finalInput: UpdatePWExtended) {
    if (finalInput.password !== finalInput.password_check) {
      return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    retryWithJWTRefresh(apiProfileUpdatePW, sessionIdState)({ password: finalInput.password }, {}).then((s) => {
      setSubmitted(s.status === 'SUCCESS');
    });
  }

  if (submitted !== null) {
    return <Submitted back={'/'} success={submitted} />;
  }

  return (
    <div className="w-full justify-center items-center flex flex-row">
      <div className="pl-2 pr-2 w-full md:w-1/2">
        <UpdateBasicForm handleSubmit={handleSubmit} input={input} setInput={setInput} />
      </div>
    </div>
  );
}
