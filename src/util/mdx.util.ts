import 'server-only';
import remarkGfm from 'remark-gfm';
import { compileMDX } from 'next-mdx-remote/rsc';

type SourceType = Parameters<typeof compileMDX>[0]['source'];

export async function compile<TFrontmatter = Record<string, unknown>>(source: SourceType) {
  return await compileMDX<TFrontmatter>({
    source,
    // XXX don't use components for now this - it has bug..
    // components: noticeMDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [remarkGfm],
      },
    },
  });
}
