import { apiUpdateComment, CommentEditReq } from '@/lib/api/course';
import { useEffect, useState } from 'react';
import Submitted from './submitted';
import { useSessionId } from '@/context/SessionIdContext';

import ReportCommentForm from './inner/form';

export default function ReportComment({ comment }: { comment: CommentEditReq }) {
  const [jwt] = useSessionId();

  const [input, setInput] = useState<CommentEditReq>(comment);

  const [submitted, setSubmitted] = useState<boolean | null>(null);

  function handleSubmit() {
    if (confirm(JSON.stringify(input)) == true) {
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

  return <ReportCommentForm />;
}
