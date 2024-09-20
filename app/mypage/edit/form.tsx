import Button from '@/components/basic/button';
import Link from 'next/link';
import Input from '@/components/basic/input';
import Spinner from '@/components/basic/spinner';
import DepartmentInput from '@/components/composite/departmentInput';

export default function MyPageEditBasicForm({
  handleSubmit,
  input,
  handleInput,
  submitting,
  department,
}: FormProps<UpdateProfileReq>) {
  return (
    <form
      className="py-8 h-full transition-all self-center justify-center items-center pl-2 pr-2 flex flex-col gap-8 w-full md:w-1/2"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-row justify-center items-center">
        <span className="font-bold text-2xl">프로필 수정</span>

        <div className="flex flex-row justify-end gap-x-2 ml-auto *:border *:border-primary-400 *:rounded-full *:text-sm *:py-1 *:px-4 *:text-primary-400">
          <Link href="/mypage/change-pw">비밀번호 수정</Link>
          <Link href="/mypage/delete-account">계정 삭제</Link>
        </div>
      </div>

      <Input
        id="username"
        placeholder="닉네임"
        value={input.username}
        onChange={handleInput}
        className="w-full"
        readOnly={handleInput === undefined}
      />
      <Input
        id="student_id"
        placeholder="학번"
        value={input.student_id}
        onChange={handleInput}
        className="w-full"
        readOnly={handleInput === undefined}
      />
      {/* <MyInput name="username" placeholder="닉네임" value={input.username} setInput={setInput} /> */}
      <Input
        id="semester"
        placeholder="학기"
        value={String(input.semester)}
        onChange={handleInput}
        className="w-full"
        readOnly={handleInput === undefined}
      />
      {department ? <DepartmentInput input={input} department={department} /> : <></>}

      <Button className="w-full" kind="filled" type="submit">
        {submitting ? (
          <span>
            <Spinner /> 처리 중...
          </span>
        ) : (
          '프로필 수정하기'
        )}
      </Button>
    </form>
  );
}
