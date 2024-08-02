import { HStack } from '@/components/basic/stack';
import { NoticeList } from './list';
import NoticeSingle from './NoticeSingle';

export default function NoticePage() {
  return (
    <HStack gap="20px" style={{ margin: '40px' }}>
      <div className="my-10 text-4xl font-medium">공지사항</div>
      <div className="w-full border border-gray-300" />
      <div>
        {NoticeList.map((notice) => (
          <NoticeSingle key={notice.id} notice={notice} />
        ))}
      </div>
    </HStack>
  );
}
