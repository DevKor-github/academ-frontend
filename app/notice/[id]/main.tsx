import { HStack } from '@/components/basic/stack';
import { Notice } from '@/lib/api/notice';
import parse from 'html-react-parser';

export default function NoticeView({ notice }: { notice: Notice }) {
  return (
    <HStack gap="10px" className="m-20 animate-fade">
      <h1 className="text-2xl font-semibold">{notice.title}</h1>
      <p className="text-sm font-medium text-gray-400">{notice.created_at}</p>
      <div className="w-full border light:border-light-back-5
      dark:border-dark-back-5 my-10"></div>
      <div>{parse(notice.detail)}</div>
    </HStack>
  );
}
