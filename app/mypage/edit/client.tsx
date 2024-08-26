'use client';

import { apiProfileUpdateBasic, UpdateProfileReq } from '@/lib/api/mypage';
import { useApiCheckLogin, useApiMyPage } from '@/lib/api/login';
import { useState } from 'react';
import Submitted from './inner/submitted';
import { useSessionId } from '@/context/SessionIdContext';
import { retryWithJWTRefresh } from '@/lib/api/authHelper';

import UpdateBasicForm from './inner/form';
import ErrorTemplate from '@/lib/template';

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
  const [jwt] = useSessionId();

  const profile = useApiMyPage({}, { token: jwt?.accessToken });

  if (profile?.status === 'SUCCESS') {
    return <MyPageEditBasicWithProfile profile={profile.data} />;
  }

  return <ErrorTemplate title="?" subtitle="오류가 발생했습니다." />;
}
