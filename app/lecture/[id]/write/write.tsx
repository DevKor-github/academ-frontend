import { apiInsertComment, CommentNewReq } from "@/lib/api/search";
import { useState } from "react";
import Button from "@/components/basic/button";
import { Course } from "@/lib/models/course";

function FieldSetStar({label, name, onChange, input} : {input : CommentNewReq, label: string, name: string, onChange : React.ChangeEventHandler<HTMLInputElement>}) {
  return <fieldset>
  <legend>{label}</legend>
    <label>
      <input type="radio" name={name} onChange={onChange} value="1" defaultChecked={
        // @ts-ignore
        input[name] === 1
      } /> 123
    </label>
    <label>
        <input id={name} type="radio" name={name} onChange={onChange} value="2" /> 2
    </label>
    <label>
        <input id={name} type="radio" name={name} onChange={onChange} value="3" /> 3
    </label>
    <label>
        <input id={name} type="radio" name={name} onChange={onChange} value="4" /> 4
    </label>
    <label>
        <input id={name} type="radio" name={name} onChange={onChange} value="5" /> 5
    </label>
  </fieldset>
}

function FieldSet({label, name, onChange, input} : {input : CommentNewReq, label: string, name: string, onChange : React.ChangeEventHandler<HTMLInputElement>}) {
  return <fieldset>
  <legend>{label}</legend>
    <label>
      <input type="radio" name={name} onChange={onChange} value="1" defaultChecked={
        // @ts-ignore
        input[name] === 1
      } /> 1
    </label>
    <label>
        <input id={name} type="radio" name={name} onChange={onChange} value="2" /> 2
    </label>
    <label>
        <input id={name} type="radio" name={name} onChange={onChange} value="3" /> 3
    </label>
    <label>
        <input id={name} type="radio" name={name} onChange={onChange} value="4" /> 4
    </label>
    <label>
        <input id={name} type="radio" name={name} onChange={onChange} value="5" /> 5
    </label>
  </fieldset>
}


function NewCommentWithId(id: number ) {
  return {
    "course_id": id,
    "rating": 1,
    "r1_amount_of_studying": 1,
    "r2_difficulty": 1,
    "r3_delivery_power": 1,
    "r4_grading": 1,
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

  function handleInputNumber(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: Number(value),
    });
  }

  function handleInputString(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
  }

  function handleInputBoolean(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: (value === "on" ? true : false),
    });
  }
  
  function handleSubmit() {
    if (confirm(JSON.stringify(input)) == true) {
      apiInsertComment(input).then(
        (s) => {
          alert(s.status + " " + s.message);
        }
      )
    }

  }

  return <main className="p-2 md:p-8 h-full transition-all">
    <form
      className="flex flex-col "
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <span className="text-2xl ">
          `{course.name}`       <span className="text-base ">
            강의평 작성하기
          </span>
        
          </span>
      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-500"> 
        <span className="text-lg">
          강의 별점 선택
        </span>
        <FieldSetStar input={input} label="단계 선택" name="rating" onChange={handleInputNumber} />
      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-500"> 
        <span className="text-lg">
          항목별 평가
        </span>
        <FieldSet input={input} label="학습량 단계 선택" name="r1_amount_of_studying" onChange={handleInputNumber} />
        <FieldSet input={input} label="난이도 단계 선택" name="r2_difficulty" onChange={handleInputNumber} />
        <FieldSet input={input} label="전달력 단계 선택" name="r3_delivery_power" onChange={handleInputNumber} />
        <FieldSet input={input} label="학점 단계 선택" name="r4_grading" onChange={handleInputNumber} />
      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-500"> 
        <span className="text-lg">
          태그 선택
        </span>

{        /* 
    "teach_t1_theory": false,
    "teach_t2_practice":false,
    "teach_t3_seminar": false,
    "teach_t4_discussion":false,
    "teach_t5_presentation":false,
    "learn_t1_theory": false,
    "learn_t2_thesis": false,
    "learn_t3_exam": false,
    "learn_t4_industry": false,*/}

      <input type="checkbox" id="teach_t1_theory"       name="teach_t1_theory" onChange={handleInputBoolean}   defaultChecked={input.teach_t1_theory} />
      <input type="checkbox" id="teach_t2_practice"     name="teach_t2_practice" onChange={handleInputBoolean} defaultChecked={input.teach_t2_practice} />
      <input type="checkbox" id="teach_t3_seminar"      name="teach_t3_seminar" onChange={handleInputBoolean}    defaultChecked={input.teach_t3_seminar} />
      <input type="checkbox" id="teach_t4_discussion"   name="teach_t4_discussion" onChange={handleInputBoolean} defaultChecked={input.teach_t4_discussion} />
      <input type="checkbox" id="teach_t5_presentation" name="teach_t5_presentation" onChange={handleInputBoolean} defaultChecked={input.teach_t5_presentation} />

      <input type="checkbox" id="learn_t1_theory"    name="learn_t1_theory"   onChange={handleInputBoolean}   defaultChecked={input.learn_t1_theory} />
      <input type="checkbox" id="learn_t2_thesis"    name="learn_t2_thesis"   onChange={handleInputBoolean} defaultChecked={input.learn_t2_thesis} />
      <input type="checkbox" id="learn_t3_exam"      name="learn_t3_exam"     onChange={handleInputBoolean}    defaultChecked={input.learn_t3_exam} />
      <input type="checkbox" id="learn_t4_industry"  name="learn_t4_industry" onChange={handleInputBoolean} defaultChecked={input.learn_t4_industry} />

      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-500"> 
        <span className="text-lg">
        강의평 작성
        </span>

      <div className="bg-neutral-100" >
        <textarea className="w-full p-8 bg-neutral-100" id="review" onChange={handleInputString} placeholder="다음 질문을 참고하여 내용을 작성해주세요. (최소 50자)" required>
        </textarea>
        <div className="w-full items-end text-right pr-2 pb-2">{input.review.length} / 최소 50자</div>
      </div>

      </div>



      <div className="flex flex-row justify-center items-center mt-8">
        <Button kind="filled" type="submit">강의평 제출하기</Button>
      </div>


    </form>

  </main>;
}