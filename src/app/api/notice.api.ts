import 'server-only';

const REPOSITORY_ROOT = process.cwd();
const NOTICES_DIR = path.resolve(REPOSITORY_ROOT, './src/markdown/notices');
const MARKDOWN_EXTENSION = '.mdx';

import fs from 'fs/promises';
import { compile } from '@/util/mdx.util';
import path from 'path';
import type { Notice, NoticeMetadata } from '@/types/notice.types';

const fns: Promise<Notice[]> = fs
  .readdir(NOTICES_DIR)
  .then((a) =>
    Promise.all(
      a
        .filter((v) => v.endsWith(MARKDOWN_EXTENSION))
        .map(async (fne: string): Promise<Notice> => {
          const pullpath = path.resolve(NOTICES_DIR, fne);
          const fn = fne.slice(0, -MARKDOWN_EXTENSION.length);

          const { content, frontmatter } = await compile<NoticeMetadata<string>>(await fs.readFile(pullpath));

          const created_at = new Date(frontmatter.created_at);

          if (Number.isNaN(created_at.getTime())) {
            return Promise.reject(new Error('not a valid date'));
          }

          return {
            filename: fn,
            content,
            created_at,
            title: frontmatter.title,
            writer: frontmatter.writer || 'unknown writer',
            tag: frontmatter.tag === undefined ? [] : frontmatter.tag,
          };
        }),
    ),
  )
  .then((arr) => arr.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()));

export default async function readNotices() {
  return fns;
}
