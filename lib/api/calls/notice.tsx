import 'server-only';
import { NOTICES_DIR } from '@/lib/directive.server';
import fs from 'fs/promises';
// import naturalCompare from 'natural-compare';
import { MARKDOWN_EXTENSION } from '@/lib/directive.server';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import type { MDXComponents } from 'mdx/types';

const noticeMDXComponents: MDXComponents = {
  h1: ({ children }: React.PropsWithChildren) => <h1 className="font-bold text-4xl">{children}</h1>,
  h2: ({ children }: React.PropsWithChildren) => <h2 className="font-bold text-3xl">{children}</h2>,
  h3: ({ children }: React.PropsWithChildren) => <h3 className="font-bold text-2xl">{children}</h3>,
  h4: ({ children }: React.PropsWithChildren) => <h4 className="font-bold text-xl">{children}</h4>,
  h5: ({ children }: React.PropsWithChildren) => <h5 className="font-bold text-lg">{children}</h5>,
  h6: ({ children }: React.PropsWithChildren) => <h6 className="font-bold">{children}</h6>,
  li: ({ children }: React.PropsWithChildren) => <li className="[&>*>li]:ml-4">{children}</li>,
  ul: ({ children }: React.PropsWithChildren) => <ul className="list-disc [&>*]:mb-3 list-inside">{children}</ul>,
  ol: ({ children }: React.PropsWithChildren) => <ol className="list-decimal [&>*]:mb-3 list-inside">{children}</ol>,
  a: ({ children, ...props }: React.AnchorHTMLAttributes<unknown>) => (
    <a className="cursor-pointer underline text-primary-500" {...props}>
      {children}
    </a>
  ),
};

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
            components: noticeMDXComponents,
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
            tag: (frontmatter.tag === undefined ? [] : frontmatter.tag)
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
