'use client';

import { apiStartUpdateComment } from '@/lib/api-client/calls/course';

import ErrorTemplate from '@/lib/template';

import { use } from 'react';
import { useState } from 'react';
import { apiUpdateComment } from '@/lib/api-client/calls/course';

import CommentEditor from '@/component/composite/commentEditor';

import Button from '@/component/basic/button';
import { FinishIcon } from '@/component/icon';
import Link from 'next/link';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';

function Submitted({ back }: { back: string }) {
  return (
    <div className="flex flex-col gap-10 w-fit items-center">
      <FinishIcon />
      <div className="text-4xl font-medium text-center">강의평이 수정되었습니다.</div>
      <Link href={back} className="w-full mt-20 text-2xl">
        <Button className="w-full">돌아가기</Button>
      </Link>
    </div>
  );
}

function EditComment({ comment, courseName }: { comment: AcdCommentEditReq; courseName: string }) {
  const [{ instances }] = useAuthTokens();
  const [input, setInput] = useState<AcdCommentEditReq>(comment);
  const [submitted, setSubmitted] = useState<number | undefined>(undefined);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (confirm('정말 수정하시겠습니까?') == true) {
      apiUpdateComment(instances.doRefresh, input).then((s) => {
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
      <div className="flex w-10/12 h-full justify-center items-center self-center">
        <Submitted back={`/lecture/${submitted}`} />
      </div>
    );
  }

  return (
    <CommentEditor mode="EDIT" courseName={courseName} handleSubmit={handleSubmit} input={input} setInput={setInput} />
  );
}

export default function EditPage({ params: { comment_id } }: { params: { comment_id: number } }) {
  const [{ instances }] = useAuthTokens();
  const editable = use(apiStartUpdateComment(instances.doRefresh, { comment_id }));

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
