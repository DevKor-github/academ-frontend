import { HStack } from '@/components/basic/stack';
import Skeleton from '@/components/composite/skeleton';
import { Notice } from '@/lib/api/notice';
import parse from 'html-react-parser';

export function NoticeLoadingView() {
  return (
    <HStack gap="10px" className="m-20">
      <h1 className="text-2xl font-semibold"><Skeleton placeholder='공지사항 제목을 불러오는 중' /></h1>
      <p className="text-sm font-medium text-gray-400"><Skeleton placeholder='0000-00-00' /></p>
      <div className="w-full border border-gray-300 my-10"></div>
      <div><Skeleton placeholder='...' /></div>
    </HStack>
  );
}

export default function NoticeView({ notice }: { notice: Notice }) {
  return (
    <HStack gap="10px" className="m-20">
      <h1 className="text-2xl font-semibold">{notice.title}</h1>
      <p className="text-sm font-medium text-gray-400">{notice.created_at}</p>
      <div className="w-full border border-gray-300 my-10"></div>
      <div>{parse(notice.detail)}</div>
    </HStack>
  );
}
