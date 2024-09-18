import apiNoticeFilenames from '@/lib/api/calls/notice';
import { HStack } from '@/components/basic/stack';
import Link from 'next/link';
import { ELEM_PER_PAGE } from '@/lib/directive';
import path from 'path';
import { MARKDOWN_EXTENSION, NOTICES_DIR } from '@/lib/directive.server';
import fs from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';

async function NoticeSingle({ filename }: { filename: string }) {
  const filepath = path.resolve(NOTICES_DIR, filename + MARKDOWN_EXTENSION);
  const source = await fs.readFile(filepath);

  const { frontmatter } = await compileMDX<NoticeMetadata>({
    source: source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    },
  });

  return (
    <div className="animate-fade">
      <Link className="flex justify-between self-centers" href={`/notice/detail/${filename}`}>
        <span className="text-base font-medium">{frontmatter.title}</span>
        <span className="text-base font-normal text-gray-400">{frontmatter.created_at}</span>
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
  const fns = await apiNoticeFilenames();
  const countNotice = fns.length;
  const countPages = Math.ceil(countNotice / ELEM_PER_PAGE);

  return new Array(countPages).fill(undefined).map((_, postId) => ({
    index: String(postId + 1),
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
  const index = Number(params.index);

  if (!Number.isSafeInteger(index)) {
    return Promise.reject('index not number');
  }

  const fns = await apiNoticeFilenames();
  const countNotice = fns.length;
  const countPages = Math.ceil(countNotice / ELEM_PER_PAGE);

  const sliced = fns.slice((index - 1) * ELEM_PER_PAGE, index * ELEM_PER_PAGE);

  return (
    <HStack gap="20px" style={{ margin: '40px' }}>
      <div className="my-10 text-4xl font-medium">공지사항</div>
      <div className="w-full border light:border-base-27 dark:border-base-5" />
      <HStack>
        {sliced.flatMap((fn) => (
          <NoticeSingle key={fn} filename={fn} />
        ))}
      </HStack>
      <NoticeListNavigate from={Number(params.index)} total={Number(countPages)} />
    </HStack>
  );
}
