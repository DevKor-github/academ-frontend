import { HStack } from '@/components/basic/stack';
import Link from 'next/link';
import { ELEM_PER_PAGE } from '@/data/constant';
import readNotices from '@/app/api/notice.api';
import type { Notice } from '@/types/notice.types';

async function NoticeSingle({ notice }: { notice: Notice }) {
  return (
    <div className="animate-fade">
      <Link className="flex justify-between self-centers" href={`/notice/${notice.filename}`}>
        <span className="text-base font-medium">{notice.title}</span>
        <span className="text-base font-normal text-gray-400">{notice.created_at.toLocaleDateString()}</span>
      </Link>
      <div
        className="w-full my-4 border
      light:border-base-27
      dark:border-base-5"
      />
    </div>
  );
}

export async function generateStaticParams() {
  const ns = await readNotices();
  const countNotice = ns.length;
  const countPages = Math.ceil(countNotice / ELEM_PER_PAGE);

  return Array.from(Array(countPages), (_, idx) => idx + 1).map((postId) => ({
    index: String(postId),
  }));
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
          href={`/notices/${v}`}
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

export default async function NoticeView(props: { params: Promise<{ index: string }> }) {
  const params = await props.params;
  const index = Number(params.index);

  if (!Number.isSafeInteger(index)) {
    return Promise.reject('index not number');
  }

  const ns = await readNotices();
  const countNotice = ns.length;
  const countPages = Math.ceil(countNotice / ELEM_PER_PAGE);

  const sliced = ns.slice((index - 1) * ELEM_PER_PAGE, index * ELEM_PER_PAGE);

  return (
    <HStack className="gap-y-5 m-10">
      <div className="my-10 text-4xl font-medium">공지사항</div>
      <div className="w-full border light:border-base-27 dark:border-base-5" />
      <HStack>
        {sliced.flatMap((n) => (
          <NoticeSingle key={n.filename} notice={n} />
        ))}
      </HStack>
      <NoticeListNavigate from={Number(params.index)} total={Number(countPages)} />
    </HStack>
  );
}
