'use client';

import { apiStartUpdateComment } from '@/lib/api/course';

import ErrorTemplate from '@/lib/template';

import { SessionIdContext } from '@/context/SessionIdContext';
import { use } from 'react';
import { useState } from 'react';
import { apiUpdateComment } from '@/lib/api/course';

import CommentEditor from '@/components/composite/commentEditor';

import Button from '@/components/basic/button';
import { FinishIcon } from '@/icons';
import Link from 'next/link';

function Submitted({ back }: { back: string }) {
  return (
    <div className="w-full h-full p-10">
      <div className="flex flex-col gap-10 w-full items-center">
        <FinishIcon />
        <div className="text-4xl font-bold text-center">강의평이 수정되었습니다.</div>
        <Link href={back} className="mt-20 text-2xl">
          <Button className="w-full">돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}

function EditComment({ comment, courseName }: { comment: AcdCommentEditReq; courseName: string }) {
  const [jwt] = use(SessionIdContext);

  const [input, setInput] = useState<AcdCommentEditReq>(comment);
  const [submitted, setSubmitted] = useState<number | undefined>(undefined);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (confirm('정말 수정하시겠습니까?') == true) {
      apiUpdateComment(input, { token: jwt?.accessToken }).then((s) => {
        if (s.status === 'SUCCESS') {
          setSubmitted(s.data);
        } else {
          alert(`강의평 수정에 실패했습니다: ${s.message}`);
        }
      });
    }
  }

  if (submitted !== undefined) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Submitted back={`/lecture/${submitted}`} />
      </div>
    );
  }

  return (
    <CommentEditor mode="EDIT" courseName={courseName} handleSubmit={handleSubmit} input={input} setInput={setInput} />
  );
}

export default function EditPage({ params: { comment_id } }: { params: { comment_id: number } }) {
  const [jwt] = use(SessionIdContext);
  const editable = use(apiStartUpdateComment({ comment_id }, { token: jwt?.accessToken }));

  return editable.status === 'SUCCESS' && editable.statusCode === 200 ? (
    <EditComment courseName={editable.data.name} comment={editable.data} />
  ) : (
    <ErrorTemplate
      title={editable.statusCode.toString()}
      subtitle={`강의평을 작성할 수 없습니다.
        ${editable.message}`}
    />
  );
}
