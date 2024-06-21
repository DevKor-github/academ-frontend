import { CommentJoin } from "@/lib/api/course";
import Button from "@/components/basic/button";
import Tag from "@/components/basic/tag";

import { StarIcon } from "@/icons";
import { VStack } from "../basic/stack";

function FieldSetStar<Req>({label, name, onChange, input} : {input : Req, label: string, name: string, onChange : React.ChangeEventHandler<HTMLInputElement>}) {
  
    // @ts-ignore
  const v_of_name: number = input[name];
    
    return <fieldset className="flex flex-row mt-4">
    <legend>{label}</legend>
        {[1, 2, 3, 4, 5].flatMap((i) =>
        <label>
            <input id={name} className="hidden" type="radio" name={name} onChange={onChange} value={i} defaultChecked={v_of_name == i} />
            {<span className={`${v_of_name >= i ? "text-primary-500" : "text-neutral-200"} text-4xl cursor-pointer`}    >
              <StarIcon/></span>}
          </label>
        )
        }
    </fieldset>
  }

function FieldSet<Req>({ label, name, onChange, input }: { input: Req, label: string, name: string, onChange: React.ChangeEventHandler<HTMLInputElement> }) {
  
  // @ts-ignore
  const v_of_name = input[name];

  return <fieldset className="flex flex-row mt-4">
  <legend>{label}</legend>
      {[1, 2, 3, 4, 5].flatMap((i) =>
      <label>
          <input id={name} className="hidden" type="radio" name={name} onChange={onChange} value={i} defaultChecked={v_of_name == i} />
          {<div className={`${v_of_name === i ? "text-primary-500 border-primary-500" : "text-neutral-200 border-neutral-200"} text-xl cursor-pointer w-8 h-8 border justify-center items-center line-clamp-2 flex rounded-lg mr-2`}    >
            {i}</div>}
        </label>
      )
      }
  </fieldset>
}

function InputToggleTag({ name, label, onChange, defaultChecked }: { defaultChecked: boolean; name: string;  label : string, onChange : (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}) {
  return <>
    <input
      type="checkbox" className="hidden" id={name} name={name} onChange={onChange} defaultChecked={defaultChecked} />
    <Tag className={` transition-all cursor-pointer w-fit ${defaultChecked ? "text-primary-500 bg-primary-100" : "text-neutral-600 bg-neutral-100"} `}
      onClick={() => onChange(
        {
          // @ts-ignore 임시조치..
          target: { id: name, value: defaultChecked ? "off" : "on" }
        }
      )}
    >{label}</Tag>
  </>
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

      <VStack gap="4px">
        <InputToggleTag  name="teach_t1_theory" onChange={handleInputBoolean}   defaultChecked={input.teach_t1_theory} label="이론 강의" />
        <InputToggleTag  name="teach_t2_practice" onChange={handleInputBoolean}   defaultChecked={input.teach_t2_practice} label="실습 수업" />
        <InputToggleTag  name="teach_t3_seminar" onChange={handleInputBoolean}   defaultChecked={input.teach_t3_seminar} label="세미나형 수업" />
        <InputToggleTag  name="teach_t4_discussion" onChange={handleInputBoolean}   defaultChecked={input.teach_t4_discussion} label="토론형 수업" />
        <InputToggleTag  name="teach_t5_presentation" onChange={handleInputBoolean}   defaultChecked={input.teach_t5_presentation} label="발표형 수업" />
      </VStack>
      <VStack gap="4px">  
        <InputToggleTag name="learn_t1_theory" onChange={handleInputBoolean} defaultChecked={input.learn_t1_theory} label="지식 습득에 도움" />
        <InputToggleTag  name="learn_t2_thesis" onChange={handleInputBoolean}   defaultChecked={input.learn_t2_thesis} label="논문 작성에 도움" />
        <InputToggleTag  name="learn_t3_exam" onChange={handleInputBoolean}   defaultChecked={input.learn_t3_exam} label="시험 대비에 도움" />
        <InputToggleTag  name="learn_t4_industry" onChange={handleInputBoolean}   defaultChecked={input.learn_t4_industry} label="실무 적용에 도움" />
      </VStack>


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