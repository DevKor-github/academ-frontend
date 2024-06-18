import { apiInsertComment, CommentNewReq } from "@/lib/api/search";
import { useState } from "react";
import Button from "@/components/basic/button";
import { Course } from "@/lib/models/course";


function NewCommentWithId(id: number ) {
  return {
    "course_id": id,
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
  
  const [input, setInput] = useState<CommentNewReq>(NewCommentWithId(course.course_id));

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

  return <main className="md:p-8 h-full">
    <form
      className="flex flex-col "
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <span className="text-4xl ">
          `{course.name}`       <span className="text-base ">
            강의평 작성하기
          </span>
        
          </span>
      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-500"> 
        <span className="text-lg">
          강의 별점 선택
        </span>
      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-500"> 
        <span className="text-lg">
          항목별 평가
        </span>
      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-500"> 
        <span className="text-lg">
          태그 선택
        </span>
      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-500"> 
        <span className="text-lg">
        강의평 작성
        </span>

      <div className="bg-neutral-100" >
        <textarea className="w-full md:p-8 bg-neutral-100" id="review" onChange={handleInput} placeholder="다음 질문을 참고하여 내용을 작성해주세요. (최소 50자)" required>
        </textarea>
        <div className="w-full items-end text-right md:pr-2 md:pb-2">{input.review.length} / 최소 50자</div>
      </div>

      </div>



      <div className="flex flex-row justify-center items-center mt-8">
        <Button kind="filled" type="submit">강의평 제출하기</Button>
      </div>


    </form>

  </main>;
}