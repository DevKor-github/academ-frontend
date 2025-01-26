import type { ReactNode } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { LectureIconPath } from '@/components/composite/lectureIcon';
import { courseDetailWithNoAuth } from '@/app/api/lecture.api';

interface Props {
  basic: ReactNode;
  client: ReactNode;
  write: ReactNode;
}

export default async function Layout({ basic, client, write }: Props) {
  return (
    <div className="flex flex-col w-full h-full">
      {basic}
      {client}
      {write}
    </div>
  );
}

export async function generateMetadata(
  props: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const course = await courseDetailWithNoAuth(Number(params.id));

  if (course.status !== 'SUCCESS') {
    if (course.statusCode === 404) {
      return {
        // TODO
        title: `강의평 - Academ`,
        description: `Academ에서 강의 평가를 확인하세요.`,
      };
    }
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${course.data.name} 강의평 - Academ`,
    description: `Academ에서 ${course.data.name}의 강의 평가를 확인하세요.`,
    openGraph: {
      images: [LectureIconPath(course.data.course_code), ...previousImages],
    },
  };
}
