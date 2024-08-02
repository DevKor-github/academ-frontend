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
      <Link className="flex justify-between" href={`/notice/${notice.id}`}>
        <span>{notice.title}</span>
        <span>{notice.date}</span>
      </Link>
      <div className="w-full my-4 border border-gray-300" />
    </div>
  );
}
