'use client';

import { apiMyPageBasics, apiProfileUpdateBasic } from '@/lib/api/calls/mypage';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import UpdateBasicForm from './form';
import ErrorTemplate from '@/lib/template';
import { handleInputBuilder } from '@/lib/form/handler';
import { departments } from '@/lib/data/departments';

function MyPageEditBasicWithProfile({
  profile: { username, student_id, degree, semester, department },
}: {
  profile: UserProfile;
}) {
  const router = useRouter();

  const [input, setInput] = useState<UpdateProfileReq>({ username, student_id, degree, semester, department });
  const [busy, setBusy] = useState<boolean>(false);

  const [dropDownList, setDropDownList] = useState<string[]>(departments);
  const [dropDownItemIndex, setDropDownItemIndex] = useState<number>(-1);
  const [isDropDown, setIsDropDown] = useState<boolean>(false);

  const showDropDownList = () => {
    if (input.department === '') {
      setIsDropDown(false);
      setDropDownList([]);
    } else {
      const choosenTextList = departments.filter((textItem) => textItem.includes(input.department));
      setDropDownList(choosenTextList);
    }
  };

  useEffect(showDropDownList, [input.department]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    apiProfileUpdateBasic(input).then((s) => {
      setBusy(false);
      if (s.status === 'SUCCESS') {
        alert('프로필 수정을 완료했습니다.');
        router.push('/mypage?profilechanged');
      } else {
        alert(`프로필 수정을 실패했습니다: ${s.message}`);
      }
    });
  }

  return (
    <UpdateBasicForm
      handleSubmit={handleSubmit}
      input={input}
      handleInput={handleInputBuilder(input, setInput)}
      submitting={busy}
      department={{ dropDownList, dropDownItemIndex, setDropDownItemIndex, isDropDown, setIsDropDown, setInput }}
    />
  );
}

export default function MyPageEditBasic() {
  const profile = use(apiMyPageBasics({}));

  if (profile.status === 'SUCCESS') {
    return <MyPageEditBasicWithProfile profile={profile.data} />;
  }

  return <ErrorTemplate title="?" subtitle="오류가 발생했습니다." />;
}
