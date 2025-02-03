import Link from 'next/link';
import DepartIcon from '@/components/composite/departIcon';
import { SkeletonSlow } from '@/components/composite/skeleton';
import { getMyPageBasics } from '../../../api/mypage.api';
import TempAlert from './components/TempAlert';
import { CloseIcon } from '@/components/icon';
import { redirect } from 'next/navigation';

function MyProfileBasicsUnsafe({
  degree,
  username,
  department,
  semester,
  point,
}: ReplaceValues<Pick<UserProfile, 'username' | 'department' | 'semester' | 'degree' | 'point'>, React.ReactNode>) {
  return (
    <div className="p-8 text-xl flex flex-row flex-wrap gap-16 w-full justify-start items-start">
      <div
        className="flex justify-center items-center text-7xl bg-white rounded-2xl p-4 border border-base-28"
        style={{ width: '192px', height: '128px' }}
      >
        <DepartIcon code="???" />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-semibold text-3xl">{username}</span> 님
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-8 text-base-14">
            <span>{department}</span>
            <span>{degree}</span>
            <span>{semester}학기</span>
          </div>
          <div className="flex flex-row gap-4">
            <span className="text-base-14">잔여 포인트</span>
            <span className="text-primary-400 font-semibold">{point}</span>
          </div>
        </div>
      </div>
      <Link href="/mypage/edit" className="self-end ml-auto">
        <button className="border border-primary-400 rounded-full text-sm pt-1 pb-1 pl-4 pr-4 text-primary-400">
          수정하기
        </button>
      </Link>
    </div>
  );
}

export function MyProfileBasicsLoading() {
  return (
    <MyProfileBasicsUnsafe
      username={<SkeletonSlow placeholder="???" />}
      department={<SkeletonSlow placeholder="???" />}
      degree={<SkeletonSlow placeholder="???" />}
      semester={<SkeletonSlow placeholder="???" />}
      point={<SkeletonSlow placeholder="???" />}
    />
  );
}

interface Props {
  searchParams: Promise<{ [K in string]: string | string[] | undefined }>;
}

export default async function MyProfileBasics({ searchParams }: Props) {
  const spKeys = Object.keys(await searchParams);

  const pwchanged = spKeys.includes('pwchanged');
  const profilechanged = spKeys.includes('profilechanged');

  const RemoveAlert = (
    <Link href="/mypage">
      <CloseIcon />
    </Link>
  );

  const mypagebasics = await getMyPageBasics();

  if (mypagebasics.status !== 'SUCCESS') {
    redirect('/login');
  }

  const userprofile = mypagebasics.data;

  const degreePrint =
    userprofile.degree === 'MASTER' ? '석사과정' : userprofile.degree === 'DOCTOR' ? '박사과정' : '?과정';

  return (
    <>
      {pwchanged ? <TempAlert closeButton={RemoveAlert}>비밀번호가 성공적으로 변경되었습니다.</TempAlert> : <></>}
      {profilechanged ? <TempAlert closeButton={RemoveAlert}>프로필을 성공적으로 업데이트했습니다.</TempAlert> : <></>}
      <MyProfileBasicsUnsafe
        username={userprofile.username}
        department={userprofile.department}
        degree={degreePrint}
        semester={userprofile.semester}
        point={userprofile.point}
      />
    </>
  );
}
