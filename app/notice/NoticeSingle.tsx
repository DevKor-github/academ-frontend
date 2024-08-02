import Link from 'next/link';

export interface Notice {
  id: number;
  title: string;
  date: string;
  text: JSX.Element;
}

export default function NoticeSingle({ notice }: { notice: Notice }) {
  return (
    <div>
      <Link className="flex justify-between self-centers" href={`/notice/${notice.id}`}>
        <span className="text-base font-medium">{notice.title}</span>
        <span className="text-base font-normal text-gray-400">{notice.date}</span>
      </Link>
      <div className="w-full my-4 border border-gray-300" />
    </div>
  );
}
