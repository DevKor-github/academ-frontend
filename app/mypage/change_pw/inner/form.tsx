import { UpdatePWExtended } from '@/lib/api/mypage';
import Button from '@/components/basic/button';

export default function UpdateBasicForm({
  handleSubmit,
  input,
  setInput,
}: {
  handleSubmit: (input: UpdatePWExtended) => void;
  input: UpdatePWExtended;
  setInput: StateChange<UpdatePWExtended>;
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
        <div className="pl-8 pr-8 font-bold text-xl">비밀번호 수정</div>

        <input
          required
          type="password"
          placeholder="새 비밀번호"
          className="bg-light-back-1 dark:bg-dark-back-2 p-4  rounded-2xl"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInput((v) => {
              return { ...v, ...{ password: event.target.value } };
            });
          }}
        />

        <input
          required
          type="password"
          placeholder="새 비밀번호 확인"
          className="bg-light-back-1 dark:bg-dark-back-2 p-4 rounded-2xl"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInput((v) => {
              return { ...v, ...{ password_check: event.target.value } };
            });
          }}
        />

        <div className="flex flex-row justify-center items-center mt-8">
          <Button kind="filled" type="submit">
            비밀번호 변경
          </Button>
        </div>
      </form>
    </main>
  );
}
