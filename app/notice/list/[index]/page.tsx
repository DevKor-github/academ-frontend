import { ssget } from '@/lib/api/calls/ssg';
import { NoticeListRequest } from '@/lib/api/calls/notice';
import { HStack } from '@/components/basic/stack';
import { Notice } from '@/lib/api/calls/notice';
import Link from 'next/link';
import { ELEM_PER_PAGE } from '@/lib/directive';

function NoticeSingle({ notice }: { notice: Notice }) {
  return (
    <div className="animate-fade">
      <Link className="flex justify-between self-centers" href={`/notice/detail/${notice.notice_id}`}>
        <span className="text-base font-medium">{notice.title}</span>
        <span className="text-base font-normal text-gray-400">{notice.created_at}</span>
      </Link>
      <div
        className="w-full my-4 border
      light:border-base-27
      dark:border-base-5"
      />
    </div>
  );
}

function NoticeListView({ notices, showMoreButton }: { notices: Notice[]; showMoreButton: React.ReactNode }) {
  return (
    <div>
      <HStack gap="20px">
        <div>
          {notices.map((notice) => (
            <NoticeSingle key={notice.notice_id} notice={notice} />
          ))}
        </div>
        {showMoreButton}
      </HStack>
    </div>
  );
}

////

// This function gets called at build time
export async function generateStaticParams() {
  // Call an external API endpoint to get posts
  const res = await ssget<Record<string, never>, ApiResponse<number>>('/api/notice/count', {});

  if (res.status !== 'SUCCESS') {
    throw new Error('Failed to get number of notice from backend server - is backend server working?');
  }

  const countNotice = res.data;
  const countPages = Math.ceil(countNotice / ELEM_PER_PAGE);

  const posts = new Array(countPages).fill(undefined);

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((_, postId) => ({
    index: String(postId + 1),
  }));

  return paths;
}

function generateNumberRange(n: number, MAX: number): number[] {
  const rangeSize = 8; // 앞뒤로 4개씩 8개의 숫자
  const halfRange = Math.floor(rangeSize / 2);

  // 최소값과 최대값을 계산
  const start = Math.max(n - halfRange, 1);
  const end = Math.min(n + halfRange, MAX);

  // 결과 배열 생성
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

function NoticeListNavigate({ from, total }: { from: number; total: number }) {
  const lists: Array<number> = generateNumberRange(from, total);

  return (
    <div className="flex flex-row w-full justify-center items-center gap-x-2">
      {lists.flatMap((v) => (
        <Link
          key={v}
          href={`/notice/list/${v}`}
          className={
            'light:bg-base-30 dark:bg-base-3 p-2 text-center rounded-md ' + (from === v ? 'text-primary-500' : '')
          }
        >
          {v}
        </Link>
      ))}
    </div>
  );
}

export default async function NoticeView({ params }: { params: { index: string } }) {
  ////
  const countRes = await ssget<Record<string, never>, ApiResponse<number>>('/api/notice/count', {});

  if (countRes.status !== 'SUCCESS') {
    throw new Error('Failed to get number of notice from backend server - is backend server working?');
  }

  const countNotice = countRes.data;
  const countPages = Math.ceil(countNotice / 10);
  ////

  const res = await ssget<NoticeListRequest, ApiResponse<Notice[]>>('/api/notice/list', { page: Number(params.index) });

  if (res.status !== 'SUCCESS') {
    throw Error('Failed to get detailed notice content');
  }

  return (
    <HStack gap="20px" style={{ margin: '40px' }}>
      <div className="my-10 text-4xl font-medium">공지사항</div>
      <div
        className="w-full border
    light:border-base-27
    dark:border-base-5"
      />
      <NoticeListView notices={res.data} showMoreButton={<button />} />
      <NoticeListNavigate from={Number(params.index)} total={Number(countPages)} />
    </HStack>
  );
}
