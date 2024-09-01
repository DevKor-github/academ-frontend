'use client';

import { apiMyPageBasics, apiProfileUpdateBasic } from '@/lib/api/mypage';
import { useState } from 'react';
import Submitted from './inner/submitted';
import { useSessionId } from '@/context/SessionIdContext';
import { retryWithJWTRefresh } from '@/lib/api/authHelper';

import UpdateBasicForm from './inner/form';
import ErrorTemplate from '@/lib/template';
import { useApi } from '@/lib/api/builder';

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

  const { loading, response: profile } = useApi(apiMyPageBasics, {}, { token: jwt?.accessToken });
  
  if (loading) {
    return <div />;
  }

  if (profile.status === 'SUCCESS') {
    return <MyPageEditBasicWithProfile profile={profile.data} />;
  }

  return <ErrorTemplate title="?" subtitle="오류가 발생했습니다." />;
}
