'use client';

import Link from 'next/link';
import Button from '@/components/basic/button';
// import Popover from '@/components/basic/popover';
import { HStack } from '@/components/basic/stack';

import { LogoutIcon, ProfileIcon } from './icons';
import { DownIcon } from '@/components/icon';
import { logout } from '@/app/actions/logout.action';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { blankButton } from '@/style/button';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@/auth/auth.util';
import Skeleton from '@/components/composite/skeleton';

function LoginButton() {
  return (
    <Link href="/login">
      <Button className="rounded-full px-5">
        <span className="whitespace-nowrap">로그인/회원가입</span>
      </Button>
    </Link>
  );
}

export default function TopNavInnerRightClient() {

  const { data: loggedIn } = useQuery({
    queryKey: ['loggedIn'],
    queryFn: async () => (await getAccessToken()) !== undefined,
  })

  if (loggedIn === undefined) {
    return <Button className="rounded-full px-5">
    <span className="whitespace-nowrap"><Skeleton placeholder="로그인/회원가입" /></span>
  </Button>
  }


  if (
    // state.status !== 'SUCCESS'
    !loggedIn
  ) {
    return <LoginButton />;
  } else {
    return (
      <Popover>
        <PopoverButton className="rounded-full bg-primary-500 text-white p-2 pl-2 pr-2 w-32">
          <span
            className="under-md:max-w-24"
            style={{ textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <span className="flex flex-row items-center gap-2">
              마이페이지 <DownIcon />
            </span>
          </span>
        </PopoverButton>
        {/* <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
            Solutions
          </PopoverButton> */}
        <PopoverPanel
          // transition
          anchor="bottom"
          className="z-[200] relative rounded-xl border bg-l mt-2 bg-white dark:bg-base-1 shadow-lg"
        >
          <HStack
            className="justify-center items-center rounded-xl
      *:flex *:flex-row *:min-h-6 *:gap-2 *:p-4 *:pb-2 *:w-full *:justify-center *:align-middle"
          >
            <Link
              className={blankButton({
                disabled: false,
                className: 'hover:light:bg-base-30 size-full hover:dark:bg-base-4',
              })}
              href="/mypage"
            >
              <ProfileIcon />
              <span>마이페이지</span>
            </Link>
            <button
              type="submit"
              className={blankButton({
                disabled: false,
                className: 'hover:light:bg-base-30 size-full hover:dark:bg-base-4',
              })}
              onClick={() => logout()}
            >
              <LogoutIcon />
              <span>로그아웃</span>
            </button>
          </HStack>
        </PopoverPanel>
      </Popover>
    );
  }
}
