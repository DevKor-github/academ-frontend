'use client';

import { apiRepComment } from '@/lib/api/course';
import { useState } from 'react';
import Submitted from './inner/submitted';

import ReportCommentForm from './inner/form';

export default function ReportComment({ comment_id }: { comment_id: number }) {
  const [input, setInput] = useState<AcdCommentReportReq>({ comment_id, reason: 'PERSONAL', detail: '' });

  const [submitted, setSubmitted] = useState<boolean | null>(null);

  function handleSubmit(finalInput: AcdCommentReportReq) {
    apiRepComment(finalInput).then((s) => {
      setSubmitted(s.status === 'SUCCESS');
    });
  }

  if (submitted !== null) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <div>
          <Submitted back={'/'} success={submitted} />
        </div>
      </div>
    );
  }

  return <ReportCommentForm handleSubmit={handleSubmit} input={input} setInput={setInput} />;
}
