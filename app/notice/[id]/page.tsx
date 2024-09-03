import { HStack } from '@/components/basic/stack';
import parse from 'html-react-parser';
import { ssget } from '@/lib/api/ssg';
import { ApiResponse } from '@/lib/api/builder';
import { Notice, NoticeDetailRequest } from '@/lib/api/notice';

// This function gets called at build time
export async function generateStaticParams() {
  // Call an external API endpoint to get posts
  const res = await ssget <{}, ApiResponse<number>>('/api/notice/count', {});

  if (res.status !== 'SUCCESS') {
    throw new Error("Failed to get number of notice from backend server - is backend server working?");
  }

  const posts = (new Array(res.data)).fill(undefined)
 
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((_, postId) => ({
    id: String(postId),
  }))
 
  return paths;
  
}

export default async function NoticeView({ params }: { params: { id: string } }) {
  
  const res = await ssget<NoticeDetailRequest , ApiResponse<Notice>>('/api/notice/detail', { notice_id : Number(params.id) });

  if (res.status !== 'SUCCESS') {
    throw Error("Failed to get detailed notice content")
  }

  const notice = res.data;

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