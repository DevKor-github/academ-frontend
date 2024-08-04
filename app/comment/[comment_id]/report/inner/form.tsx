import { CommentReportReq } from '@/lib/api/course';
import Button from '@/components/basic/button';

function PickOne(f: StateChange<String>) {}

export default function ReportCommentForm({
  handleSubmit,
  input,
  setInput,
}: {
  handleSubmit: (input: CommentReportReq) => void;
  input: CommentReportReq;
  setInput: StateChange<CommentReportReq>;
}) {
  return (
    <main className="p-2 md:p-8 h-full transition-all">
      <form
        className="flex flex-col "
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(input);
        }}
      >
        <div>강의평 신고</div>

        <textarea
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInput((v) => {
              return { ...v, ...{ detail: event.target.value } };
            });
          }}
        />

        <div className="flex flex-row justify-center items-center mt-8">
          <Button kind="filled" type="submit">
            강의평 제출하기
          </Button>
        </div>
      </form>
    </main>
  );
}
