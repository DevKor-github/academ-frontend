import { CommentJoin } from "@/lib/api/course";
import Button from "@/components/basic/button";

function FieldSetStar<Req>({label, name, onChange, input} : {input : Req, label: string, name: string, onChange : React.ChangeEventHandler<HTMLInputElement>}) {
  
    // @ts-ignore
  const v_of_name: number = input[name];

    
    return <fieldset>
    <legend>{label}</legend>
        {[1, 2, 3, 4, 5].flatMap((i) =>
        <label>
        <input id={name} type="radio" name={name} onChange={onChange} value={i} defaultChecked={v_of_name == i} /> {i}
          </label>
        )
        }
    </fieldset>
  }

function FieldSet<Req>({ label, name, onChange, input }: { input: Req, label: string, name: string, onChange: React.ChangeEventHandler<HTMLInputElement> }) {
  
  // @ts-ignore
  const v_of_name = input[name];

  return <fieldset>
  <legend>{label}</legend>
      {[1, 2, 3, 4, 5].flatMap((i) =>
      <label>
      <input id={name} type="radio" name={name} onChange={onChange} value={i} defaultChecked={v_of_name == i} /> {i}
        </label>
      )
      }
  </fieldset>
}




export default function WriteOrEditComment<Req extends CommentJoin>({ title, handleSubmit, input, setInput }: {
  title: React.ReactNode, handleSubmit: (req: Req) => void,
  input: Req, setInput: React.Dispatch<React.SetStateAction<Req>>
 }) {


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


  return <main className="p-2 md:p-8 h-full transition-all">
    <form
      className="flex flex-col "
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(input);
      }}
    >
      <div>
        {title}
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
        <FieldSet input={input} label="학습량 단계 선택" name="r1_amount_of_studying" onChange={handleInputNumber}  />
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

      <input type="checkbox" id="teach_t1_theory"       name="teach_t1_theory" onChange={handleInputBoolean}   defaultChecked={input.teach_t1_theory} />이론 강의
      <input type="checkbox" id="teach_t2_practice"     name="teach_t2_practice" onChange={handleInputBoolean} defaultChecked={input.teach_t2_practice} />실습 수업
      <input type="checkbox" id="teach_t3_seminar"      name="teach_t3_seminar" onChange={handleInputBoolean}    defaultChecked={input.teach_t3_seminar} />세미나형 수업
      <input type="checkbox" id="teach_t4_discussion"   name="teach_t4_discussion" onChange={handleInputBoolean} defaultChecked={input.teach_t4_discussion} />토론형 수업
        <input type="checkbox" id="teach_t5_presentation" name="teach_t5_presentation" onChange={handleInputBoolean} defaultChecked={input.teach_t5_presentation} />발표형 수업
        
      <input type="checkbox" id="learn_t1_theory"    name="learn_t1_theory"   onChange={handleInputBoolean}   defaultChecked={input.learn_t1_theory} />지식 습득에 도움
      <input type="checkbox" id="learn_t2_thesis"    name="learn_t2_thesis"   onChange={handleInputBoolean} defaultChecked={input.learn_t2_thesis} />논문 작성에 도움
      <input type="checkbox" id="learn_t3_exam"      name="learn_t3_exam"     onChange={handleInputBoolean}    defaultChecked={input.learn_t3_exam} />시험 대비에 도움
      <input type="checkbox" id="learn_t4_industry"  name="learn_t4_industry" onChange={handleInputBoolean} defaultChecked={input.learn_t4_industry} />실무 적용에 도움

      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-500"> 
        <span className="text-lg">
        강의평 작성
        </span>

      <div className="bg-neutral-100" >
        <textarea className="w-full p-8 bg-neutral-100" id="review" onChange={handleInputString} placeholder="다음 질문을 참고하여 내용을 작성해주세요. (최소 50자)" defaultValue={input.review} required>
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