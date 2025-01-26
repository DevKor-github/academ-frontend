import { notFound } from 'next/navigation';
import { HStack } from '@/components/basic/stack';
import readNotices from '@/app/api/notice.api';

function MarkdownWrapper({ children }: React.PropsWithChildren<unknown>) {
  return (
    <div
      className="flex flex-col gap-4
    *:mb-4
    *:list-inside

    *:[&_li]:pl-4
    *:[&_li]:list-inside
    [&_li]:pl-4
    [&_li]:list-inside
    [&_ol]:list-decimal
    [&_ul]:list-disc

    [&_h1]:font-black [&_h1]:text-xl
    [&_h2]:font-bold [&_h2]:text-xl
    [&_h3]:font-medium [&_h3]:text-xl
    [&_h4]:font-black [&_h4]:text-lg
    [&_h5]:font-bold [&_h5]:text-lg
    [&_h6]:font-medium [&_h6]:text-lg
    
    [&_a]:underline [&_a]:text-primary-500
    "
    >
      {children}
    </div>
  );
}

export async function generateStaticParams() {
  return (await readNotices()).map((n) => {
    return { path: n.filename };
  });
}

export default async function NoticeView(props: { params: Promise<{ path: string }> }) {
  const params = await props.params;

  const { path } = params;

  const notice = (await readNotices()).find((n) => n.filename === path);

  if (notice === undefined) {
    notFound();
  }

  return (
    <HStack className="gap-y-3 transition-all md:m-16 md:mx-32 m-10 animate-fade">
      <h1 className="text-2xl font-semibold">{notice.title}</h1>
      <p className="text-sm font-medium text-gray-400">{notice.created_at.toLocaleDateString()}</p>
      <div
        className="w-full border light:border-base-27
    dark:border-base-5 my-10"
      ></div>
      <MarkdownWrapper>{notice.content}</MarkdownWrapper>
    </HStack>
  );
}
