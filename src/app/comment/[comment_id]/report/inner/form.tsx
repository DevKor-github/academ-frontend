import Button from '@/components/basic/button';
import type { AcdCommentReportReq } from '@/types/comment.types';

const reasons = [
  { reason: 'PROFANITY', text: '욕설/비방/비하' },
  { reason: 'INSINCERE', text: '성의없는 강의평' },
  { reason: 'SEXUAL', text: '음란성/선정성' },
  { reason: 'PERSONAL', text: '개인정보 노출' },
  { reason: 'OTHER', text: '기타' },
] as const;

function ReasonPicker({ setInput, input }: { input: AcdCommentReportReq; setInput: SetState<AcdCommentReportReq> }) {
  return (
    <fieldset className="flex flex-row flex-wrap justify-center mt-4 gap-4 w-full">
      {reasons.flatMap((i) => (
        <label>
          <input
            id="reason"
            className="accent-primary-500"
            type="radio"
            name="reason"
            onChange={function () {
              // e: React.ChangeEvent<HTMLInputElement>
              setInput((v) => {
                return { ...v, ...{ reason: i.reason } };
              });
            }}
            value={i.reason}
            defaultChecked={input.reason === i.reason}
          />
          {
            <span className={`${input.reason === i.reason ? 'text-primary-500' : 'text-neutral-500'} cursor-pointer`}>
              {i.text}
            </span>
          }
        </label>
      ))}
    </fieldset>
  );
}

export default function ReportCommentForm({
  handleSubmit,
  input,
  setInput,
}: {
  handleSubmit: (input: AcdCommentReportReq) => void;
  input: AcdCommentReportReq;
  setInput: SetState<AcdCommentReportReq>;
}) {
  return (
    <div className="pt-8 pb-8 h-full transition-all pl-16 pr-16">
      <form
        className="flex flex-col gap-8"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(input);
        }}
      >
        <div className="pl-8 pr-8 font-bold text-xl w-full text-center">강의평 신고</div>

        <ReasonPicker input={input} setInput={setInput} />

        <textarea
          rows={1}
          placeholder="신고 사유를 입력해주세요."
          className="bg-base-31 dark:bg-base-2 p-8 h-auto"
          maxLength={3000}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInput((v) => {
              return { ...v, ...{ detail: event.target.value } };
            });
          }}
        />

        <div className="flex flex-row justify-center items-center mt-8">
          <Button kind="filled" type="submit">
            강의평 신고하기
          </Button>
        </div>
      </form>
    </div>
  );
}
