import Button from '@/components/basic/button';
import Link from 'next/link';
import Input from '@/components/basic/input';
import Spinner from '@/components/basic/spinner';

export default function MyPageEditBasicForm({
  handleSubmit,
  input,
  handleInput,
  submitting,
}: FormProps<UpdateProfileReq>) {
  return (
    <main className="pt-8 pb-8 h-full transition-all">
      <form
        className="flex flex-col gap-8"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-row justify-between">
          <div className="pl-8 pr-8 font-bold text-xl">프로필 수정</div>
          <div>
          <Link href="/mypage/change-pw" className="self-end ml-auto">
            <button className="border border-primary-400 rounded-full text-sm pt-1 pb-1 pl-4 pr-4 text-primary-400">
              비밀번호 수정
            </button>
          </Link>
          <Link href="/mypage/delete-account" className="self-end ml-auto">
            <button className="border border-primary-400 rounded-full text-sm pt-1 pb-1 pl-4 pr-4 text-primary-400">
              계정 삭제
            </button>
            </Link>
          </div>
        </div>

        <Input id="username" placeholder="닉네임" value={input.username} onChange={handleInput} readOnly={handleInput === undefined} />
        <Input id="student_id" placeholder="학번" value={input.student_id} onChange={handleInput} readOnly={handleInput === undefined} />
        {/* <MyInput name="username" placeholder="닉네임" value={input.username} setInput={setInput} /> */}
        <Input id="semester" placeholder="학기" value={String(input.semester)} onChange={handleInput} readOnly={handleInput === undefined} />
        <Input id="department" placeholder="소속" value={input.department} onChange={handleInput} readOnly={handleInput === undefined} />

        <div className="flex flex-row justify-center items-center mt-8">
          <Button kind="filled" type="submit">
            {submitting ? <span><Spinner /> 처리 중...</span> : "프로필 수정하기"}
          </Button>
        </div>
      </form>
    </main>
  );
}
