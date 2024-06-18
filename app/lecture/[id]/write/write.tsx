import { apiInsertComment } from "@/lib/api/search";
import { useState } from "react";
import Button from "@/components/basic/button";
import { Comment } from "@/lib/models/comment";
import { Course } from "@/lib/models/course";

function NewCommentWithId(id: number) {
  return {  "course_id": id,
    "rating": 0,
    "r1_amount_of_studying": 0,
    "r2_difficulty": 0,
    "r3_delivery_power": 0,
    "r4_grading": 0,
    "review": '',
    "teach_t1_theory": false,
    "teach_t2_practice":false,
    "teach_t3_seminar": false,
    "teach_t4_discussion":false,
    "teach_t5_presentation":false,
    "learn_t1_theory": false,
    "learn_t2_thesis": false,
    "learn_t3_exam": false,
    "learn_t4_industry": false,}
}

export default function WriteComment({ course }: { course: Course }) {
  
  const [input, setInput] = useState<Comment>(NewCommentWithId(course.course_id));

  function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
  }
  
  function handleSubmit() {
    apiInsertComment(input).then(
      (s) => {
        alert(s.status + " " + s.message);
      }
    )
  }

  return <main className="p-8 h-full">
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <span className="text-2xl ">
        `{course.name}`       <span className="text-base ">
          강의평 작성하기
        </span>
      
      </span>

      강의 별점 선택
      항목별 평가
      태그 선택
      강의평 작성
      {course.course_id}

      <textarea id="review" onChange={handleInput}></textarea>
      <Button type="submit">강의평 제출하기</Button>

    </form>
  </main>;
}