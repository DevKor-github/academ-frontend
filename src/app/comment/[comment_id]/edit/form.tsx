'use client';

import { useState } from 'react';
import CommentEditor from '@/components/composite/commentEditor';
import Button from '@/components/basic/button';
import { FinishIcon } from '@/components/icon';
import Link from 'next/link';
import { updateComment } from '@/app/api/comment.api';
import type { AcdCommentEditReq } from '@/types/comment.types';

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

export default function EditComment({ comment, courseName }: { comment: AcdCommentEditReq; courseName: string }) {
  const [input, setInput] = useState<AcdCommentEditReq>(comment);
  const [submitted, setSubmitted] = useState<number | undefined>(undefined);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (confirm('정말 수정하시겠습니까?') == true) {
      updateComment(input).then((s) => {
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
