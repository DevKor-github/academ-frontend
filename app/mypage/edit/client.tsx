'use client';

import { apiMyPageBasics, apiProfileUpdateBasic } from '@/lib/api/mypage';
import { useState } from 'react';
import Submitted from './inner/submitted';
import { useSessionId } from '@/context/SessionIdContext';
import { retryWithJWTRefresh } from '@/lib/api/authHelper';

import MyPageEditBasicForm from './inner/form';

import UpdateBasicForm from './inner/form';
import ErrorTemplate from '@/lib/template';
import { useApi } from '@/lib/api/builder';
import { handleInputBuilder } from '@/lib/form/handler';

function MyPageEditBasicWithProfile({
  profile: { username, student_id, degree, semester, department },
}: {
  profile: UserProfile;
}) {
  const [input, setInput] = useState<UpdateProfileReq>({ username, student_id, degree, semester, department });

  const [submitted, setSubmitted] = useState<boolean | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  const sessionIdState = useSessionId();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    retryWithJWTRefresh(apiProfileUpdateBasic, sessionIdState)(input, {}).then((s) => {
      setBusy(false);
      setSubmitted(s.status === 'SUCCESS');
    });
  }

  if (submitted !== null) {
    return <Submitted back={'/'} success={submitted} />;
  }

  return <UpdateBasicForm handleSubmit={handleSubmit} input={input} handleInput={handleInputBuilder(input, setInput)} submitting={busy} />;
}

export default function MyPageEditBasic() {
  const [jwt] = useSessionId();

  const { loading, response: profile } = useApi(apiMyPageBasics, {}, { token: jwt?.accessToken });
  
  if (loading) {
    return <MyPageEditBasicForm input={{ username : '', student_id : '', degree: 'MASTER', semester: 0, department: '' }} submitting={false} />;
  }

  if (profile.status === 'SUCCESS') {
    return <MyPageEditBasicWithProfile profile={profile.data} />;
  }

  return <ErrorTemplate title="?" subtitle="오류가 발생했습니다." />;
}
