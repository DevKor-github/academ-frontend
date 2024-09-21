import Button from '@/components/basic/button';
import Link from 'next/link';
import Input from '@/components/basic/input';
import Spinner from '@/components/basic/spinner';
import DepartmentInput from '@/components/composite/departmentInput';
import Select from '@/components/basic/select';

export default function MyPageEditBasicForm({
  handleSubmit,
  input,
  handleInput,
  submitting,
  department,
}: FormProps<UpdateProfileReq>) {
  return (
    <form
      className="py-8 h-full transition-all self-center justify-center items-start pl-2 pr-2 flex flex-col gap-4 w-11/12 md:w-1/2"
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

      <span className="text-xl mx-2 mt-4">닉네임</span>
      <Input
        id="username"
        placeholder="닉네임"
        value={input.username}
        onChange={handleInput}
        className="w-full"
        readOnly={handleInput === undefined}
      />
      <span className="text-xl mx-2 mt-4">학번</span>
      <Input
        id="student_id"
        placeholder="학번"
        value={input.student_id}
        onChange={handleInput}
        className="w-full"
        readOnly={handleInput === undefined}
      />
      <span className="text-xl mx-2 mt-4">학기</span>
      <Input
        id="semester"
        placeholder="학기"
        value={String(input.semester)}
        onChange={handleInput}
        className="w-full"
        readOnly={handleInput === undefined}
      />

      <span className="text-xl mx-2 mt-4">학과</span>
      {department ? <DepartmentInput input={input} department={department} /> : <></>}

      <span className="text-xl mx-2 mt-4">학위 과정</span>
      <Select
        id="degree"
        value={input.degree}
        handleValue={handleInput}
        items={[
          { value: 'MASTER', label: '석사' },
          { value: 'DOCTOR', label: '박사' },
        ]}
      />

      <Button className="w-full mt-4" kind="filled" type="submit">
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
