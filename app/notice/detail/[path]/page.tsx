import fs from 'fs/promises';
import nodePath from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { REPOSITORY_ROOT, MARKDOWN_EXTENSION } from '@/lib/directive.server';
import apiNoticeFilenames from '@/lib/api/calls/notice';
import { HStack } from '@/components/basic/stack';
import { MDXComponents } from 'mdx/types';

export async function generateStaticParams() {
  return await apiNoticeFilenames();
}

const noticeMDXComponents: MDXComponents = {
  h1: ({ children }: React.PropsWithChildren) => <h1 className='font-bold text-4xl'>{children}</h1>,
  h2: ({ children }: React.PropsWithChildren) => <h2 className='font-bold text-3xl'>{children}</h2>,
  h3: ({ children }: React.PropsWithChildren) => <h3 className='font-bold text-2xl'>{children}</h3>,
  h4: ({ children }: React.PropsWithChildren) => <h4 className='font-bold text-xl'>{children}</h4>,
  h5: ({ children }: React.PropsWithChildren) => <h5 className='font-bold text-lg'>{children}</h5>,
  h6: ({ children }: React.PropsWithChildren) => <h6 className='font-bold'>{children}</h6>,
  li: ({ children }: React.PropsWithChildren) => <li className='[&>*>li]:ml-4'>{children}</li>,
  ul: ({ children }: React.PropsWithChildren) => <ul className='list-disc [&>*]:mb-3 list-inside'>{children}</ul>,
  ol: ({ children }: React.PropsWithChildren) => <ol className='list-decimal [&>*]:mb-3 list-inside'>{children}</ol>,
  a: ({ children, ...props }: React.AnchorHTMLAttributes<unknown>) => <a className='cursor-pointer underline text-primary-500' {...props}>{children}</a>,
}

export default async function NoticeView({ params: { path } }: { params: { path: string } }) {
  const filepath = nodePath.resolve(REPOSITORY_ROOT, './markdown/notices', path + MARKDOWN_EXTENSION);
  const source = await fs.readFile(filepath);

  const { content, frontmatter } = await compileMDX<NoticeMetadata>({
    source: source,
    components: noticeMDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: []
      }
    }
  });

  return (<HStack gap="10px" className="transition-all md:m-16 md:mx-32 m-4 animate-fade">
    <h1 className="text-2xl font-semibold">{frontmatter.title}</h1>
    <p className="text-sm font-medium text-gray-400">{frontmatter.created_at}</p>
    <div
      className="w-full border light:border-base-27
    dark:border-base-5 my-10"
    ></div>
    <div className='flex flex-col gap-4'>{content}</div>
  </HStack>);
}
