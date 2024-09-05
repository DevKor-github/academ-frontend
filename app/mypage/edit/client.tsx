'use client';

import { apiMyPageBasics, apiProfileUpdateBasic } from '@/lib/api/mypage';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  
  const router = useRouter();
  
  const [input, setInput] = useState<UpdateProfileReq>({ username, student_id, degree, semester, department });
  const [busy, setBusy] = useState<boolean>(false);

  const sessionIdState = useSessionId();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    retryWithJWTRefresh(apiProfileUpdateBasic, sessionIdState)(input, {}).then((s) => {
      setBusy(false);
      if (s.status === 'SUCCESS') {
        alert("프로필 수정을 완료했습니다.");
        router.push('/mypage?profilechanged');
      } else {
        alert(`프로필 수정을 실패했습니다: ${s.message}`);
      }
    });
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
