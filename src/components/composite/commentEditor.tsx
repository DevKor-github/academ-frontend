import Button from '@/components/basic/button';

import { StarIcon } from '@/components/icon';
import { VStack } from '../basic/stack';
import { useEffect, useRef } from 'react';

import Popover from '../basic/popover';
import { useState } from 'react';

function FieldSetStar<Req>({
  name,
  onChange,
  input,
}: {
  input: Req;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const v_of_name: number = (input as Record<string, number>)[name];

  return (
    <fieldset className="flex flex-row mt-4">
      {[1, 2, 3, 4, 5].flatMap((i) => (
        <label>
          <input
            id={name}
            className="hidden"
            type="radio"
            name={name}
            onChange={onChange}
            value={i}
            defaultChecked={v_of_name == i}
          />
          {
            <span className={`${v_of_name >= i ? 'text-primary-500' : 'text-neutral-200'} text-4xl cursor-pointer`}>
              <StarIcon />
            </span>
          }
        </label>
      ))}
    </fieldset>
  );
}

function FieldSet<Req>({
  label,
  name,
  onChange,
  input,
}: {
  input: Req;
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const v_of_name = (input as Record<string, number>)[name];

  return (
    <fieldset className="flex flex-row my-7 mr-40">
      <legend className="mb-4">
        <span className="font-bold">{label}</span> 어땠나요?
      </legend>
      {[1, 2, 3, 4, 5].flatMap((i) => (
        <label>
          <input
            id={name}
            className="hidden"
            type="radio"
            name={name}
            onChange={onChange}
            value={i}
            defaultChecked={v_of_name == i}
          />
          {
            <div
              className={`${v_of_name === i ? 'text-primary-500 border-primary-500' : 'text-neutral-200 border-neutral-200'} text-xl cursor-pointer w-8 h-8 border justify-center items-center line-clamp-2 flex rounded-lg mr-2`}
            >
              {i}
            </div>
          }
        </label>
      ))}
    </fieldset>
  );
}

function InputToggleTag({
  id,
  label,
  onChange,
  checked,
}: {
  checked: boolean;
  id: string;
  label: string;
  onChange: React.ChangeEventHandler;
}) {
  return (
    <label
      className={`flex text-xs rounded-full transition-all justify-center text-center items-center px-4 py-1 bg-neutral-100 text-neutral-500 cursor-pointer w-fit ${checked ? 'text-primary-500 bg-primary-100' : 'text-neutral-600 bg-neutral-100'}`}
      htmlFor={id}
    >
      {label}
      <input type="checkbox" className="hidden" id={id} name={id} onChange={onChange} defaultChecked={checked} />
    </label>
  );
}

export default function CommentEditor<Req extends AcdCommentReqJoin>({
  mode,
  courseName,
  handleSubmit,
  input,
  setInput,
}: {
  mode: 'WRITE' | 'EDIT';
  courseName: string;
  handleSubmit?: React.FormEventHandler;
  input: Req;
  setInput: SetState<Req>;
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

  function countLables(input: Req): number {
    const booleanFields = [
      input.teach_t1_theory,
      input.teach_t2_practice,
      input.teach_t3_seminar,
      input.teach_t4_discussion,
      input.teach_t5_presentation,
      input.learn_t1_theory,
      input.learn_t2_thesis,
      input.learn_t3_exam,
      input.learn_t4_industry,
    ];

    // booleanFields 배열에서 true인 값의 개수를 카운트
    const trueCount = booleanFields.filter((v) => v === true).length;
    return trueCount;
  }

  const [tagNum, setTagNum] = useState<number>(countLables(input));

  function handleInputBoolean(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    if (tagNum < 3 || !checked) {
      setInput({
        ...input,
        [event.target.id]: checked ? true : false,
      });
      if (checked) {
        setTagNum(tagNum + 1);
      } else {
        setTagNum(tagNum - 1);
      }
    } else alert('태그는 최대 3개까지 선택 가능합니다.');
  }

  const [open, setOpen] = useState(false);

  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto'; // 높이 초기화
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    handleResizeHeight();
  }, []);

  return (
    <form className="flex flex-col p-6 md:p-8 h-full transition-all" method="post" onSubmit={handleSubmit}>
      <div className="my-10 text-2xl">
        `{courseName}` <span className="text-base text-gray-400">{mode === 'EDIT' ? '수정하기' : '작성하기'}</span>
      </div>

      <div className="py-10 border-b border-b-neutral-400">
        <span className="text-lg">강의 별점 선택</span>
        <FieldSetStar input={input} name="rating" onChange={handleInputNumber} />
      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-400 flex flex-wrap">
        <span className="text-lg w-full">항목별 평가</span>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <FieldSet input={input} label="학습량" name="r1_amount_of_studying" onChange={handleInputNumber} />
          <FieldSet input={input} label="난이도" name="r2_difficulty" onChange={handleInputNumber} />
          <FieldSet input={input} label="전달력" name="r3_delivery_power" onChange={handleInputNumber} />
          <FieldSet input={input} label="학점" name="r4_grading" onChange={handleInputNumber} />
        </div>
      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-400">
        <div className="flex justify-start items-center mb-5">
          <span className="text-lg mr-10">태그 선택</span>
          <span className="text-sm text-gray-400 align-middle">최대 3개의 태그를 선택할 수 있습니다.</span>
        </div>
        {/* 
    "teach_t1_theory": false,
    "teach_t2_practice":false,
    "teach_t3_seminar": false,
    "teach_t4_discussion":false,
    "teach_t5_presentation":false,
    "learn_t1_theory": false,
    "learn_t2_thesis": false,
    "learn_t3_exam": false,
    "learn_t4_industry": false,*/}

        <span className="inline-block my-5">수업 진행 방식 선택</span>
        <VStack className="flex-wrap gap-y-2 gap-x-6">
          <InputToggleTag
            id="teach_t1_theory"
            onChange={handleInputBoolean}
            checked={input.teach_t1_theory}
            label="이론 강의"
          />
          <InputToggleTag
            id="teach_t2_practice"
            onChange={handleInputBoolean}
            checked={input.teach_t2_practice}
            label="실습 및 실험"
          />
          <InputToggleTag
            id="teach_t3_seminar"
            onChange={handleInputBoolean}
            checked={input.teach_t3_seminar}
            label="세미나"
          />
          <InputToggleTag
            id="teach_t4_discussion"
            onChange={handleInputBoolean}
            checked={input.teach_t4_discussion}
            label="토론"
          />
          <InputToggleTag
            id="teach_t5_presentation"
            onChange={handleInputBoolean}
            checked={input.teach_t5_presentation}
            label="발표"
          />
        </VStack>
        <span className="inline-block mt-10 mb-5">학습 내용 선택</span>
        <VStack className="gap-x-6 flex-wrap gap-y-2">
          <InputToggleTag
            id="learn_t1_theory"
            onChange={handleInputBoolean}
            checked={input.learn_t1_theory}
            label="이론 지식 습득"
          />
          <InputToggleTag
            id="learn_t2_thesis"
            onChange={handleInputBoolean}
            checked={input.learn_t2_thesis}
            label="논문 작성 도움"
          />
          <InputToggleTag
            id="learn_t3_exam"
            onChange={handleInputBoolean}
            checked={input.learn_t3_exam}
            label="졸업 시험 대비"
          />
          <InputToggleTag
            id="learn_t4_industry"
            onChange={handleInputBoolean}
            checked={input.learn_t4_industry}
            label="현업 적용"
          />
        </VStack>
      </div>

      <div className="pt-8 pb-8 border-b border-b-neutral-500">
        <span className="text-lg inline-block mb-10">
          강의평 작성{' '}
          <button
            className="bg-none border border-primary-500 text-primary-500 aspect-square pl-2 pr-2 ml-2 text-sm rounded-full"
            type="button"
            onClick={() => setOpen((b) => !b)}
          >
            ?
          </button>
          {open && (
            <Popover hide={() => setOpen(false)}>
              <div className="border border-neutral-200 rounded-md p-4 mt-4 text-neutral-600">
                <div className="text-sm pb-2">질문 리스트</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 auto-cols-max list-disc list-inside gap-x-4">
                  <li className="text-xs">과제의 주기는 어떤가요?</li>
                  <li className="text-xs">수업 방식은 어떤가요?</li>
                  <li className="text-xs">어떤 내용을 배울 수 있나요?</li>
                  <li className="text-xs">어떤 배경지식이 있으면 좋을까요?</li>
                  <li className="text-xs">수업이 연구하는데 도움이 되었나요?</li>
                  <li className="text-xs">시험은 어떻게 준비하면 좋을까요?</li>
                </ul>
              </div>
            </Popover>
          )}
        </span>

        <div className="light:bg-base-31 dark:bg-base-6">
          <textarea
            ref={textarea}
            onInput={handleResizeHeight}
            rows={5}
            className="w-full p-8 light:bg-base-31 dark:bg-base-6 resize-none"
            id="review"
            onChange={handleInputString}
            placeholder="다음 질문을 참고하여 내용을 작성해주세요. (최소 50자)"
            defaultValue={input.review}
            maxLength={3000}
            required
          ></textarea>
          <div className="w-full items-end text-right pr-2 pb-2">{input.review.length} / 최소 50자</div>
        </div>
        <div className="flex justify-end mt-4">
          <span className="text-[#DC143C]">강의 평가 내용은 50자 이상이어야합니다.</span>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center mt-8">
        <Button kind="filled" type="submit" className="px-20" disabled={input.review.length < 50}>
          강의평 제출하기
        </Button>
      </div>
    </form>
  );
}
