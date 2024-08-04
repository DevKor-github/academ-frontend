import { UpdateProfileReq } from '@/lib/api/mypage';
import Button from '@/components/basic/button';

export default function UpdateBasicForm({
  handleSubmit,
  input,
  setInput,
}: {
  handleSubmit: (input: UpdateProfileReq) => void;
  input: UpdateProfileReq;
  setInput: StateChange<UpdateProfileReq>;
}) {
  return (
    <main className="pt-8 pb-8 h-full transition-all">
      <form
        className="flex flex-col gap-8"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(input);
        }}
      >
        <div className="pl-8 pr-8 font-bold text-xl">프로필 수정</div>

        <textarea
          required
          placeholder="신고 사유를 입력해주세요."
          className="bg-light-back-1 dark:bg-dark-back-2 p-8"
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInput((v) => {
              return { ...v, ...{ detail: event.target.value } };
            });
          }}
        />

        <div className="flex flex-row justify-center items-center mt-8">
          <Button kind="filled" type="submit">
            프로필 수정하기
          </Button>
        </div>
      </form>
    </main>
  );
}
