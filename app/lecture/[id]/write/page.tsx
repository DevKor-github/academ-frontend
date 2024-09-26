'use client';

import { use, useState } from 'react';
import Link from 'next/link';

import { apiInsertComment, apiStartNewComment } from '@/lib/api-client/calls/course';

import CommentEditor from '@/component/composite/commentEditor';
import Button from '@/component/basic/button';
import { FinishIcon } from '@/component/icon';

import ErrorTemplate from '@/lib/template';
import { URL_CUSTOMER_SURVEY } from '@/lib/directive';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';

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

function Submitted({ back }: { back: string }) {
  return (
    <div className="flex flex-col gap-10 w-fit items-center">
      <FinishIcon />
      <div className="text-4xl font-medium text-center">강의평이 등록되었습니다.</div>
      <div className="flex flex-row w-fit rounded-lg p-4 font-medium text-left bg-base-30 gap-8">
        <span>
          <span className="font-bold">아카뎀 이용</span>은 어떠셨나요? <br /> 1분 설문조사 참여하고 커피☕️ 쿠폰
          받아가세요!
        </span>
        <Link
          className="bg-gradient-to-r from-primary-400 to-primary-600 rounded-full h-fit p-2 text-white"
          href={URL_CUSTOMER_SURVEY}
        >
          참여하기
        </Link>
      </div>
      <Link href={back} className="w-full mt-20 text-2xl">
        <Button className="w-full">돌아가기</Button>
      </Link>
    </div>
  );
}

function WriteComment({ course }: { course: Course }) {
  const [{ instances }] = useAuthTokens();
  const [input, setInput] = useState<AcdCommentNewReq>(NewCommentWithId(course.course_id));
  const [submitted, setSubmitted] = useState<number | undefined>(undefined);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (confirm('작성 완료하시겠습니까?') == true) {
      apiInsertComment(instances.doRefresh, input).then((s) => {
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
      <div className="flex w-10/12 h-full justify-center items-center self-center">
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
  const [{ instances }] = useAuthTokens();
  const writable = use(apiStartNewComment(instances.doRefresh, { course_id: id }));

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
