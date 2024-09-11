'use client';

import { apiStartNewComment } from '@/lib/api/course';

import ErrorTemplate from '@/lib/template';

import { useSessionId } from '@/context/SessionIdContext';

import { apiInsertComment } from '@/lib/api/course';
import { useState } from 'react';

import CommentEditor from '@/components/composite/commentEditor';

import { retryWithJWTRefresh } from '@/lib/api/authHelper';
import { use } from 'react';

function NewCommentWithId(id: number) {
  return {
    course_id: id,
    rating: 1,
    r1_amount_of_studying: 1,
    r2_difficulty: 1,
    r3_delivery_power: 1,
    r4_grading: 1,
    review: '',
    teach_t1_theory: false,
    teach_t2_practice: false,
    teach_t3_seminar: false,
    teach_t4_discussion: false,
    teach_t5_presentation: false,
    learn_t1_theory: false,
    learn_t2_thesis: false,
    learn_t3_exam: false,
    learn_t4_industry: false,
    already_like: false,
  };
}

import Button from '@/components/basic/button';
import { FinishIcon } from '@/icons';
import Link from 'next/link';

function Submitted({ back }: { back: string }) {
  return (
    <div className="w-full h-full p-10">
      <div className="flex flex-col gap-10 w-full items-center">
        <FinishIcon />
        <div className="text-4xl font-bold text-center">강의평이 등록되었습니다.</div>
        <Link href={back} className="mt-20 text-2xl">
          <Button className="w-full">돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}

function WriteComment({ course }: { course: Course }) {
  const sessionId = useSessionId();

  const [input, setInput] = useState<AcdCommentNewReq>(NewCommentWithId(course.course_id));
  const [submitted, setSubmitted] = useState<number | undefined>(undefined);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (confirm('작성 완료하시겠습니까?') == true) {
      retryWithJWTRefresh(
        apiInsertComment,
        sessionId,
      )(input).then((s) => {
        if (s.status === 'SUCCESS') {
          setSubmitted(s.data);
        } else {
          alert(`강의평 작성에 실패했습니다: ${s.message}`);
        }
      });
    }
  }

  if (submitted !== undefined) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <div>
          <Submitted back={`/lecture/${submitted}`} />
        </div>
      </div>
    );
  }

  return (
    <CommentEditor
      mode="WRITE"
      courseName={course.name}
      handleSubmit={handleSubmit}
      input={input}
      setInput={setInput}
    />
  );
}

export default function WritePage({ params: { id } }: { params: { id: number } }) {
  const [jwt] = useSessionId();

  const writable = use(apiStartNewComment({ course_id: id }, { token: jwt?.accessToken }));

  return writable.status === 'SUCCESS' && writable.status === 'SUCCESS' && writable.statusCode === 200 ? (
    <WriteComment course={writable.data} />
  ) : (
    <ErrorTemplate
      title={writable.statusCode.toString()}
      subtitle={`강의평을 작성할 수 없습니다.
        ${writable.message}`}
    />
  );
}
