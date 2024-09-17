import { HStack } from '@/components/basic/stack';
import parse from 'html-react-parser';
import { ssget } from '@/lib/api/calls/ssg';
import { NoticeDetailed, NoticeDetailRequest } from '@/lib/api/calls/notice';
import Image from 'next/image';

// This function gets called at build time
export async function generateStaticParams() {
  // Call an external API endpoint to get posts
  const res = await ssget<Record<string, never>, ApiResponse<number>>('/api/notice/count', {});

  if (res.status !== 'SUCCESS') {
    throw new Error('Failed to get number of notice from backend server - is backend server working?');
  }

  const posts = new Array(res.data).fill(undefined);

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((_, postId) => ({
    id: String(postId),
  }));

  return paths;
}

export default async function NoticeView({ params }: { params: { id: string } }) {
  const res = await ssget<NoticeDetailRequest, ApiResponse<NoticeDetailed>>('/api/notice/detail', {
    notice_id: Number(params.id),
  });

  if (res.status !== 'SUCCESS') {
    throw Error('Failed to get detailed notice content');
  }

  const notice = res.data;

  const imgs = ['image_1', 'image_2', 'image_3', 'image_4', 'image_5'] as const;

  return (
    <HStack gap="10px" className="m-20 animate-fade">
      <h1 className="text-2xl font-semibold">{notice.title}</h1>
      <p className="text-sm font-medium text-gray-400">{notice.created_at}</p>
      <div
        className="w-full border light:border-light-back-5
      dark:border-dark-back-5 my-10"
      ></div>
      {imgs.map(
        (v) =>
          notice[v] !== undefined && (
            // <div key={v}>{notice[v] + '.png'}</div>
            <Image
              key={v}
              src={'/public/' + notice[v] + '.png'}
              width={100}
              height={100}
              alt="공지사항의 첫 번째 이미지"
            />
          ),
      )}
      <div>{parse(notice.detail)}</div>
    </HStack>
  );
}
