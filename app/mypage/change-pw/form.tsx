import Button from '@/components/basic/button';
import Input from '@/components/basic/input';
import Spinner from '@/components/basic/spinner';

export default function ChangePWForm({ handleSubmit, input, submitting, handleInput }: FormProps<UpdatePWExtended>) {
  return (
    <main className="pt-8 pb-8 h-full transition-all justify-center items-center flex flex-row pl-2 pr-2">
      <form className="flex flex-col gap-8  w-full md:w-1/2" method="post" onSubmit={handleSubmit}>
        <div className="pl-8 pr-8 font-bold text-xl">비밀번호 수정</div>

        <Input
          required
          id="old_password"
          type="password"
          autoComplete="current-password"
          placeholder="기존 비밀번호"
          value={input.old_password}
          className="bg-light-back-1 dark:bg-dark-back-2 p-4  rounded-2xl"
          onChange={handleInput}
        />

        <Input
          required
          id="new_password"
          autoComplete="new-password"
          type="password"
          placeholder="새 비밀번호"
          value={input.new_password}
          className="bg-light-back-1 dark:bg-dark-back-2 p-4  rounded-2xl"
          onChange={handleInput}
        />

        <Input
          required
          type="password"
          id="new_password_check"
          autoComplete="new-password"
          placeholder="새 비밀번호 확인"
          value={input.new_password_check}
          className="bg-light-back-1 dark:bg-dark-back-2 p-4 rounded-2xl"
          onChange={handleInput}
        />

        <div className="flex flex-row justify-center items-center mt-8">
          <Button disabled={submitting} kind="filled" type="submit">
            {submitting ? <Spinner /> : '비밀번호 변경'}
          </Button>
        </div>
      </form>
    </main>
  );
}
