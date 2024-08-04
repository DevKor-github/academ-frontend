'use client';

import { useSessionId } from '../../context/SessionIdContext';
import CommentsView from '../lecture/[id]/components/comments';

import { Course } from '@/lib/models/course';
import { UserProfile } from '@/lib/models/user';
import { useApiMyPage } from '@/lib/api/login';

import SearchSingle from '../lecture/SearchSingle';
import { HStack, VStack } from '@/components/basic/stack';
import { isBookmark } from '@/lib/api/course';
import Link from 'next/link';

import ManageMembership from './inner/ManageMembership';
import UserDataOverview from './inner/UserdataOverview';

function NoSessionIdFallback() {
  return <div>이 기능을 사용하려면 로그인해야 합니다.</div>;
}

function CoursesView({ courses }: { courses: (Course & isBookmark)[] }) {
  return (
    <HStack
      className="pl-2 pr-2 md:pl-8 md:pr-8 pt-24 h-full transition-all
  light:bg-light-back-1 dark:bg-dark-back-1
  "
    >
      <VStack className="items-center justify-start gap-2">
        <span className="text-2xl">강의 책갈피</span>
      </VStack>
      <div className="overflow-scroll w-full">
        <div className="flex flex-row w-fit gap-4 p-8">
          {courses.flatMap((v) => (
            <SearchSingle course={v} />
          ))}
        </div>
      </div>
    </HStack>
  );
}

export default function MyPage() {
  const [jwt] = useSessionId();

  const myprofile = useApiMyPage({}, { token: jwt?.accessToken });

  if (jwt === null) {
    return <NoSessionIdFallback />;
  }

  if (myprofile === null) {
    return <div>로딩중</div>;
  }

  if (myprofile.status === 'SUCCESS') {
    return (
      <main className="w-full flex-grow">
        <UserDataOverview userprofile={myprofile.data} />
        <ManageMembership profile={myprofile.data} />
        <CoursesView courses={myprofile.data.courses} />
        <CommentsView comments={myprofile.data.comments} />
      </main>
    );
  } else {
    return <div>오류</div>;
  }
}
