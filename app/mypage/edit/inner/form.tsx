import { UpdateProfileReq } from '@/lib/api/mypage';
import Button from '@/components/basic/button';
import Link from 'next/link';

function MyInput({
  name,
  placeholder,
  setInput,
  value,
}: {
  value: string;
  name: keyof UpdateProfileReq;
  placeholder: string;
  setInput: StateChange<UpdateProfileReq>;
}) {
  return (
    <input
      required
      placeholder={placeholder}
      value={value}
      className="bg-light-back-1 dark:bg-dark-back-2 p-8"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setInput((v) => {
          const ret = { ...v };
          // @ts-ignore
          ret[name] = event.target.value;
          return ret;
        });
      }}
    />
  );
}

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
        <div className="w-full flex flex-row justify-between">
          <div className="pl-8 pr-8 font-bold text-xl">프로필 수정</div>
          <Link href="/mypage/edit" className="self-end ml-auto">
            <button className="border border-primary-400 rounded-full text-sm pt-1 pb-1 pl-4 pr-4 text-primary-400">
              비밀번호 수정하기
            </button>
          </Link>
        </div>

        <MyInput name="username" placeholder="닉네임" value={input.username} setInput={setInput} />
        <MyInput name="student_id" placeholder="학번" value={input.student_id} setInput={setInput} />
        {/* <MyInput name="username" placeholder="닉네임" value={input.username} setInput={setInput} /> */}
        <MyInput name="semester" placeholder="학기" value={String(input.semester)} setInput={setInput} />
        <MyInput name="department" placeholder="소속" value={input.department} setInput={setInput} />

        <div className="flex flex-row justify-center items-center mt-8">
          <Button kind="filled" type="submit">
            프로필 수정하기
          </Button>
        </div>
      </form>
    </main>
  );
}
