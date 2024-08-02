'use client';

import { usePathname } from 'next/navigation';
import { NoticeList } from '../list';
import { HStack } from '@/components/basic/stack';

export default function NoticeDetailPage() {
  const path = usePathname();
  const id = path.split('/').pop();

  // id로 해당 notice를 찾음
  const notice = NoticeList.find((notice) => notice.id === Number(id));

  // 데이터가 없으면 에러 처리
  if (!notice) {
    return <div>{id}</div>;
  }

  return (
    <HStack gap="10px" className="m-20">
      <h1 className="text-2xl font-semibold">{notice.title}</h1>
      <p className="text-sm font-medium text-gray-400">{notice.date}</p>
      <div className="w-full border border-gray-300 my-10"></div>
      <div>{notice.text}</div>
    </HStack>
  );
}
