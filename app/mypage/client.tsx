'use client';
import { useSessionId } from '../../context/SessionIdContext';
import CommentsView from '../lecture/[id]/components/comments';

import { Course } from '@/lib/models/course';
import { UserProfile } from '@/lib/models/user';
import { useApiMyPage } from '@/lib/api/login';

import SearchSingle from '../lecture/SearchSingle';
import { HStack, VStack } from '@/components/basic/stack';
import { isBookmark } from '@/lib/api/course';

function NoSessionIdFallback() {
  return <div>이 기능을 사용하려면 로그인해야 합니다.</div>;
}

function UserData({ userprofile }: { userprofile: UserProfile }) {
  return (
    <div className="p-8 text-xl col-auto">
      <div className="text-3xl pb-4">내 정보</div>
      <div>
        <span className="font-bold">이름</span> {userprofile.username}
      </div>
      <div>
        <span className="font-bold">학번</span> {userprofile.student_id}
      </div>
      <div>
        <span className="font-bold">과정</span> {userprofile.degree}
      </div>
      <div>
        <span className="font-bold">학과</span> {userprofile.department}
      </div>
      <div>
        <span className="font-bold">포인트</span> {userprofile.point}
      </div>
    </div>
  );
}

function ManageMembership({ profile }: { profile: UserProfile }) {
  let expr = new Date(profile.access_expiration_date);

  return (
    <div>
      <div>
        <div>
          강의평 작성 시 100 포인트, 작성한 강의평이 좋아요를 10개 이상 받을 시 50 포인트를 얻을 수 있습니다. 강의평
          삭제 시 100 포인트가 차감됩니다. 신규가입자는 한 달 동안 자유롭게 열람이 가능하며, 이후 열람하기 위해서는
          강의평을 작성하여 포인트를 받아야합니다
        </div>
        {expr.toLocaleDateString()}
      </div>
      <div>
        <div>30일</div>
        <div>90일</div>
        <div>180일</div>
      </div>
    </div>
  );
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
        <UserData userprofile={myprofile.data} />
        <ManageMembership profile={myprofile.data} />
        <CoursesView courses={myprofile.data.courses} />
        <CommentsView comments={myprofile.data.comments} />
      </main>
    );
  } else {
    return <div>오류</div>;
  }
}
