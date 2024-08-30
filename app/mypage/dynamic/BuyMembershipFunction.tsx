'use client';

import { apiBuyAcess } from '@/lib/api/membership';
import { useSessionId } from '@/context/SessionIdContext';

import MembershipIcon from './MembershipIcons';

export default function BuyMembershipButton({ membershipData }: { membershipData: MembershipData }) {
  const [jwt] = useSessionId();

  function buyHandler() {
    if (
      confirm(
        `이용권 (${membershipData.day}일권) 을 정말 구매하시겠습니까? ${membershipData.price} 포인트가 소모됩니다.`,
      )
    ) {
      apiBuyAcess({ item: membershipData.item }, { token: jwt?.accessToken }).then((v) => {
        if (v.status == 'SUCCESS') {
          alert(`이용권 (${membershipData.day}일권) 을 정상적으로 구매하였습니다.`);
        } else if (v.status == 'ERROR') {
          alert(`다음 이유로 실패하였습니다: ${v.message}`);
        } else {
          alert('알 수 없는 이유로 구매에 실패하였습니다. 잠시 후 다시 시도해주세요.');
        }
      });
    }
  }

  return (
    <button className="flex flex-row gap-16 p-8 rounded-xl border border-neutral-300 w-max" onClick={buyHandler}>
      <div className="flex flex-col items-start">
        <span className="text-2xl font-bold">강의 열람권 ({membershipData.day}일)</span>
        <span>{membershipData.price}포인트</span>
      </div>
      <div className="ml-auto">
        <MembershipIcon level={membershipData.iconLevel} />
      </div>
    </button>
  );
}