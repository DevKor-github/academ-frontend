import Button from '@/components/basic/button';
import { FinishIcon, IssueIcon } from '@/components/icon';
import Link from 'next/link';

export default function Submitted({ success, back }: { success: boolean; back: string }) {
  return (
    <div className="flex flex-col gap-10 w-full items-center">
      {success ? <FinishIcon /> : <IssueIcon />}
      <div className="text-4xl font-bold text-center">
        {success ? '강의평이 신고되었습니다.' : '강의평 신고에 실패하였습니다.'}
      </div>
      <Link href={back} className="mt-20 w-full text-2xl">
        <Button className="w-full">돌아가기</Button>
      </Link>
    </div>
  );
}
