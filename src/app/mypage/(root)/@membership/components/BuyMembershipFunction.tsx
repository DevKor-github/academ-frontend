'use client';

import { useActionState } from 'react';
import MembershipIcon from '../icons/MembershipIcons';
import Form from 'next/form';
import { MyPageBuyMembership } from '@/app/api/mypage.api';
import { twMerge } from 'tailwind-merge';

async function buyHandler(currentState: Omit<MembershipData, 'item'>, formData: FormData) {
  const item = formData.get('membership')?.toString() || '';

  if (
    confirm(`이용권 (${currentState.day}일권) 을 정말 구매하시겠습니까? ${currentState.price} 포인트가 소모됩니다.`)
  ) {
    MyPageBuyMembership(item).then((v) => {
      if (v.status == 'SUCCESS') {
        alert(`이용권 (${currentState.day}일권) 을 정상적으로 구매하였습니다.`);
        location.reload();
      } else if (v.status == 'ERROR') {
        alert(`실패했습니다: ${v.message}`);
      } else {
        alert('알 수 없는 이유로 구매에 실패하였습니다. 잠시 후 다시 시도해주세요.');
      }
    });
  }

  return currentState;
}

export default function BuyMembershipButton({ membershipData }: { membershipData: MembershipData }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, isPending] = useActionState(buyHandler, membershipData);

  return (
    <Form action={formAction} disabled={isPending}>
      <button
        type="submit"
        className={twMerge(
          `transition-all flex flex-row gap-16 px-8 py-4 rounded-3xl border
          cursor-pointer
        w-max
        hover:-translate-y-2 hover:light:shadow-xl
        hover:dark:shadow-md hover:dark:shadow-primary-500 hover:light:shadow-base-28
        
        light:border-base-28 dark:border-base-7`,
          isPending && 'opacity-20',
        )}
      >
        <input className="hidden" name="membership" value={membershipData.item} readOnly />
        <div className="flex flex-col items-start self-center">
          <span className="text-xl font-semibold">강의 열람권 ({membershipData.day}일)</span>
          <span className="text-base-13">{membershipData.price}포인트</span>
        </div>
        <div className="ml-auto">
          <MembershipIcon level={membershipData.iconLevel} />
        </div>
      </button>
    </Form>
  );
}
