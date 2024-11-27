import 'server-only';

const REPOSITORY_ROOT = process.cwd();
const NOTICES_DIR = path.resolve(REPOSITORY_ROOT, './src/markdown/notices');
const MARKDOWN_EXTENSION = '.mdx';

import fs from 'fs/promises';
// import naturalCompare from 'natural-compare';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';

const fns: Promise<Notice[]> = fs
  .readdir(NOTICES_DIR)
  .then((a) =>
    Promise.all(
      a
        .filter((v) => v.endsWith(MARKDOWN_EXTENSION))
        .map(async (fne: string): Promise<Notice> => {
          const pullpath = path.resolve(NOTICES_DIR, fne);
          const fn = fne.slice(0, -MARKDOWN_EXTENSION.length);

          const { content, frontmatter } = await compileMDX<NoticeMetadata<string>>({
            source: await fs.readFile(pullpath),
            // XXX don't use this - it has bug..
            // components: noticeMDXComponents,
            options: {
              parseFrontmatter: true,
              mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [],
              },
            },
          });

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
  .then(
    // use descending order
    (arr) => arr.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()),
  );

export default async function apiGetNotices() {
  return fns;
}
