import Link from 'next/link';
import { IssueIcon } from '../icon';

export function LoginRequiredView() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-full">
      <IssueIcon />
      <span className="w-fulltext-center text-2xl text-center">이 페이지는 로그인해야 합니다.</span>
      <span className="w-fulltext-center text-base text-center text-primary-500 underline">
        <Link href={`/login`}>로그인</Link>
      </span>
    </div>
  );
}

export function NoMembershipView() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-full">
      <IssueIcon />
      <span className="w-fulltext-center text-2xl text-center">이 페이지를 보려면 이용권을 구매해야 합니다.</span>
      <span className="w-fulltext-center text-base text-center text-primary-500 underline">
        <Link href={`/mypage`}>로그인</Link>
      </span>
    </div>
  );
}
