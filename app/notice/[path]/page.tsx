import { HStack } from '@/components/basic/stack';
import apiGetNotices from '@/lib/api/calls/notice';

export async function generateStaticParams() {
  return (await apiGetNotices()).map((n) => {
    return { path: n.filename };
  });
}

export default async function NoticeView({ params: { path } }: { params: { path: string } }) {
  const notice = (await apiGetNotices()).find((n) => n.filename === path);

  if (notice === undefined) {
    throw new Error('notice file not found');
  }

  return (
    <HStack gap="10px" className="transition-all md:m-16 md:mx-32 m-10 animate-fade">
      <h1 className="text-2xl font-semibold">{notice.title}</h1>
      <p className="text-sm font-medium text-gray-400">{notice.created_at.toLocaleDateString()}</p>
      <div
        className="w-full border light:border-base-27
    dark:border-base-5 my-10"
      ></div>
      <div className="flex flex-col gap-4">{notice.content}</div>
    </HStack>
  );
}
