'use client';

import { apiProfileUpdateBasic, UpdateProfileReq } from '@/lib/api/mypage';
import { useState } from 'react';
import Submitted from './inner/submitted';
import { useSessionId } from '@/context/SessionIdContext';
import { retryWithJWTRefresh } from '@/lib/api/authHelper';

import UpdateBasicForm from './inner/form';
import { UserProfile } from '@/lib/models/user';
import { apiCheckLogin } from '@/lib/api/login';
import { createApiHook } from '@/lib/api/builder';

function MyPageEditBasicWithProfile({
  profile: { username, student_id, degree, semester, department },
}: {
  profile: UserProfile;
}) {
  const [input, setInput] = useState<UpdateProfileReq>({ username, student_id, degree, semester, department });

  const [submitted, setSubmitted] = useState<boolean | null>(null);

  const sessionIdState = useSessionId();

  function handleSubmit(finalInput: UpdateProfileReq) {
    retryWithJWTRefresh(apiProfileUpdateBasic, sessionIdState)(finalInput, {}).then((s) => {
      setSubmitted(s.status === 'SUCCESS');
    });
  }

  if (submitted !== null) {
    return <Submitted back={'/'} success={submitted} />;
  }

  return <UpdateBasicForm handleSubmit={handleSubmit} input={input} setInput={setInput} />;
}

export default function MyPageEditBasic() {
  // const sessionId = useSessionId();
  // retryWithJWTRefresh(apiCheckLogin, sessionId)({});
  return <div />;
}
