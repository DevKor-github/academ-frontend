import { Notice } from '@/lib/api/notice';
import Link from 'next/link';

export default function NoticeSingle({ notice }: { notice: Notice }) {
  return (
    <div>
      <Link className="flex justify-between self-centers" href={`/notice/${notice.notice_id}`}>
        <span className="text-base font-medium">{notice.title}</span>
        <span className="text-base font-normal text-gray-400">{notice.created_at}</span>
      </Link>
      <div className="w-full my-4 border border-gray-300" />
    </div>
  );
}
