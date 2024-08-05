'use client';

import { HStack } from '@/components/basic/stack';
import NoticeResultsView from './fetch';

export default function NoticePage() {
  return (
    <HStack gap="20px" style={{ margin: '40px' }}>
      <div className="my-10 text-4xl font-medium">공지사항</div>
      <div className="w-full border border-gray-300" />
      <NoticeResultsView />
    </HStack>
  );
}
