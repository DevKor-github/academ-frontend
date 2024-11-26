import { SkeletonSlow } from '@/components/composite/skeleton';
import BuyMembershipButton from './components/BuyMembershipFunction';

const memberships: Array<MembershipData> = [
  { item: '30DAYS', day: 30, price: 100, iconLevel: 1 },
  { item: '90DAYS', day: 90, price: 200, iconLevel: 2 },
  { item: '180DAYS', day: 180, price: 400, iconLevel: 3 },
];

function MyProfileMembershipsUnsafe({ expireLabel }: { expireLabel: React.ReactNode }) {
  return (
    <div
      className="p-8 pb-16 mt-8 border-t
    light:border-t-base-24 dark:border-t-base-8 "
    >
      <div className="flex flex-row text-2xl mt-8 pb-2">
        <span>강의 열람권</span>
        <div className="inline-block ml-auto">
          <span className="rounded-lg text-base bg-primary-400 text-white p-2 transition-shadow hover:shadow-lg hover:shadow-primary-500 px-3">
            {expireLabel}
          </span>
        </div>
      </div>
      <div className="border border-primary-500 bg-opacity-5 bg-primary-400 p-8 mt-8 mb-8 rounded-2xl">
        <div>
          강의평 작성 시 100 포인트, 작성한 강의평이 좋아요를 10개 이상 받을 시 50 포인트를 얻을 수 있습니다.
          <br />
          강의평 삭제 시 100 포인트가 차감됩니다.
          <br />
          <br />
          신규가입자는 한 달 동안 자유롭게 열람이 가능하며, 이후 열람하기 위해서는 강의평을 작성하여 포인트를
          받아야합니다
        </div>
      </div>
      <div className="flex flex-row mt-4 gap-x-4 flex-wrap gap-y-2">
        {memberships.flatMap((v) => (
          <BuyMembershipButton key={v.item} membershipData={v} />
        ))}
      </div>
    </div>
  );
}

export function MyProfileMembershipsLoading() {
  return <MyProfileMembershipsUnsafe expireLabel={<SkeletonSlow placeholder="D-???" />} />;
}

export default function MyProfileMemberships({ access_expiration_date }: Pick<UserProfile, 'access_expiration_date'>) {
  const expireLabel: string = (() => {
    const now = new Date();
    const expire = new Date(access_expiration_date);
    const diff = expire.getTime() - now.getTime();
    const diffDay = Math.ceil(diff / (1000 * 3600 * 24));

    if (diffDay > 0) {
      return `만료예정: D-${diffDay}`;
    } else if (diffDay === 0) {
      return '오늘 만료';
    } else {
      return `만료됨`;
    }
  })();

  return <MyProfileMembershipsUnsafe expireLabel={expireLabel} />;
}
