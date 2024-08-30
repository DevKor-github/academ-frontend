import { apiInsertComment } from '@/lib/api/course';
import { useState } from 'react';
import Submitted from './submitted';

import WriteOrEditComment from '@/components/composite/form';

import { useSessionId } from '@/context/SessionIdContext';
import { retryWithJWTRefresh } from '@/lib/api/authHelper';

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
  };
}

export default function WriteComment({ course }: { course: Course }) {
  const sessionId = useSessionId();

  const [input, setInput] = useState<AcdCommentNewReq>(NewCommentWithId(course.course_id));
  const [submitted, setSubmitted] = useState<boolean | null>(null);

  function handleSubmit() {
    if (confirm('작성 완료하시겠습니까?') == true) {
      retryWithJWTRefresh(
        apiInsertComment,
        sessionId,
      )(input).then((s) => {
        if (s.status === 'SUCCESS') {
          setSubmitted(true);
        } else {
          setSubmitted(false);
        }
      });
    }
  }

  if (submitted !== null) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <div>
          <Submitted back={`/lecture/${course.course_id}`} success={submitted} />
        </div>
      </div>
    );
  }

  return (
    <WriteOrEditComment
      title={
        <span className="text-2xl ">
          `{course.name}` <span className="text-base text-gray-400">강의평 작성하기</span>
        </span>
      }
      handleSubmit={handleSubmit}
      input={input}
      setInput={setInput}
    />
  );
}
