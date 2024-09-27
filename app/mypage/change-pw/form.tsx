import Button from '@/component/basic/button';
import ErrorLabel from '@/component/basic/errorlabel';
import Input from '@/component/basic/input';
import Spinner from '@/component/basic/spinner';

export default function ChangePWForm({
  handleSubmit,
  input,
  submitting,
  handleInput,
  error,
}: FormProps<UpdatePWExtended>) {
  return (
    <form
      className="py-8 h-full transition-all self-center justify-center items-start pl-2 pr-2 flex flex-col gap-4 w-11/12 md:w-1/2"
      method="post"
      onSubmit={handleSubmit}
    >
      <span className="pl-8 pr-8 font-bold text-2xl self-center">비밀번호 수정</span>

      <span className="text-xl mx-2 mt-4">기존 비밀번호</span>
      <Input
        required
        id="old_password"
        type="password"
        autoComplete="current-password"
        placeholder="기존 비밀번호"
        value={input.old_password}
        className="bg-base-32 dark:bg-base-2 p-4 rounded-2xl w-full"
        onChange={handleInput}
        maxLength={24}
      />

      <ErrorLabel
        label={error ? '영문자, 숫자, 또는 특수문자로 이루어진 8 - 24 자리의 비밀번호를 입력해주세요.' : ''}
      />

      <span className="text-xl mx-2 mt-4">새 비밀번호</span>
      <Input
        required
        id="new_password"
        autoComplete="new-password"
        type="password"
        placeholder="새 비밀번호"
        value={input.new_password}
        className="bg-base-32 dark:bg-base-2-back-2 p-4 rounded-2xl w-full"
        onChange={handleInput}
        maxLength={24}
      />

      <span className="text-xl mx-2 mt-4">새 비밀번호 확인</span>
      <Input
        required
        type="password"
        id="new_password_check"
        autoComplete="new-password"
        placeholder="새 비밀번호 확인"
        value={input.new_password_check}
        className="bg-base-32 dark:bg-base-2 p-4 rounded-2xl w-full"
        onChange={handleInput}
        maxLength={24}
      />

      <Button
        className="w-full mt-4"
        disabled={
          submitting || input.old_password === '' || input.new_password === '' || input.new_password_check === ''
        }
        kind="filled"
        type="submit"
      >
        {submitting ? <Spinner /> : '비밀번호 변경'}
      </Button>
    </form>
  );
}
