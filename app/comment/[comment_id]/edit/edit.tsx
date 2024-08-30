import { apiUpdateComment } from '@/lib/api/course';
import { useEffect, useState } from 'react';
import Submitted from './submitted';
import { useSessionId } from '@/context/SessionIdContext';

import WriteOrEditComment from '@/components/composite/form';

export default function EditComment({ comment, courseName }: { comment: AcdCommentEditReq; courseName: string }) {
  const [jwt] = useSessionId();

  const [input, setInput] = useState<AcdCommentEditReq>(comment);

  const [submitted, setSubmitted] = useState<boolean | null>(null);

  function handleSubmit() {
    if (confirm('정말 수정하시겠습니까?') == true) {
      apiUpdateComment(input, { token: jwt?.accessToken }).then((s) => {
        if (s.status === 'SUCCESS') {
          setSubmitted(true);
        } else {
          setSubmitted(false);
        }
      });
    }
  }

  if (submitted !== null) {
    return <Submitted back={'/'} success={submitted} />;
  }

  return (
    <WriteOrEditComment
      title={
        <span className="text-2xl ">
          `{courseName}` <span className="text-base ">강의평 수정하기</span>
        </span>
      }
      handleSubmit={handleSubmit}
      input={input}
      setInput={setInput}
    />
  );
}
