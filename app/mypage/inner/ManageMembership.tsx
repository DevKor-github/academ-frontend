'use client';

import { UserProfile } from '@/lib/models/user';
import { apiBuyAcess } from '@/lib/api/membership';
import { useSessionId } from '@/context/SessionIdContext';

import MembershipIcon from './MembershipIcons';

interface MembershipData {
  item: string;
  day: number;
  price: number;
  iconLevel: 1 | 2 | 3;
}

const memberships: Array<MembershipData> = [
  { item: '30DAYS', day: 30, price: 100, iconLevel: 1 },
  { item: '90DAYS', day: 90, price: 200, iconLevel: 2 },
  { item: '180DAYS', day: 180, price: 400, iconLevel: 3 },
];

function BuyMembershipButton({ membershipData }: { membershipData: MembershipData }) {
  const [jwt] = useSessionId();

  function buyHandler() {
    apiBuyAcess({ item: membershipData.item }, { token: jwt?.accessToken }).then((v) => {
      if (v.status == 'SUCCESS') {
        alert(`이용권 (${membershipData.day}일권) 을 정상적으로 구매하였습니다.`);
      } else if (v.status == 'FAILURE') {
        alert(`다음 이유로 실패하였습니다: ${v.message}`);
      } else {
        alert('알 수 없는 이유로 구매에 실패하였습니다. 잠시 후 다시 시도해주세요.');
      }
    });
  }

  return (
    <button className="flex flex-row gap-16 p-8 rounded-xl border border-neutral-300" onClick={buyHandler}>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">강의 열람권 ({membershipData.day}일)</span>
        <span>{membershipData.price}포인트</span>
      </div>
      <div>
        <MembershipIcon level={membershipData.iconLevel} />
      </div>
    </button>
  );
}

export default function ManageMembership({ profile }: { profile: UserProfile }) {
  let expireLabel = (() => {
    let now = new Date();
    let expire = new Date(profile.access_expiration_date);
    let diff = expire.getTime() - now.getTime();
    const diffDay = Math.ceil(diff / (1000 * 3600 * 24));

    if (diffDay > 0) {
      return `D-${diffDay}`;
    } else if (diffDay === 0) {
      return '오늘 만료';
    } else {
      return `만료됨 (D+${Math.abs(diffDay)})`;
    }
  })();

  return (
    <div className="p-8 mt-8 border-t border-t-white pb-16">
      <div className="text-2xl mt-8 pb-8">
        강의 열람권
        <span className="text-primary-500"> {expireLabel}</span>
      </div>
      <div className="border border-primary-900 p-8 mt-8 mb-8 rounded-2xl">
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
      <div className="flex flex-row mt-4 gap-x-4">
        {memberships.flatMap((v) => (
          <BuyMembershipButton membershipData={v} />
        ))}
      </div>
    </div>
  );
}
