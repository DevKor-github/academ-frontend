'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useAuthTokens } from '@/lib/context/AuthTokensContext';

import Button from '@/components/basic/button';
import Popover from '@/components/basic/popover';
import { HStack } from '@/components/basic/stack';

import { LogoutIcon, ProfileIcon } from './icons';
import { DownIcon } from '@/components/icon';

function ProfilePopover({ setOpenPopover }: { setOpenPopover: (b: boolean) => void }) {
  return (
    <Popover
      hide={() => setOpenPopover(false)}
      className={
        'absolute rounded-xl overflow-hidden border bg-l bg-white dark:bg-base-1 right-2 md:right-8 top-14 shadow-lg '
      }
      style={{ zIndex: 100 }}
    >
      <HStack
        className="justify-center items-center rounded-xl
      *:flex *:flex-row *:min-h-6 *:gap-2 *:p-4 *:pb-2 *:w-full *:justify-center *:align-middle"
      >
        <Link
          className="
        hover:light:bg-light-base-30
        hover:dark:bg-base-4"
          href="/mypage"
        >
          <ProfileIcon />
          <span>마이페이지</span>
        </Link>
        <Link
          className="
        hover:light:bg-base-30
        hover:dark:bg-base-4"
          href="/logout"
        >
          <LogoutIcon />
          <span>로그아웃</span>
        </Link>
      </HStack>
    </Popover>
  );
}

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
  const [jwt] = useAuthTokens();
  const [open, setOpen] = useState<boolean>(false);
  // const state = use(apiMyPageBasics({}, { token: jwt?.accessToken }));

  if (
    // state.status !== 'SUCCESS'
    jwt.accessToken === null
  ) {
    return <LoginButton />;
  } else {
    return (
      <div>
        <Button
          className="rounded-full bg-primary-500 text-white p-2 pl-2 pr-2 w-32"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="under-md:max-w-24"
            style={{ textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <span className="flex flex-row items-center gap-2">
              마이페이지 <DownIcon />
            </span>
          </span>
        </Button>
        {open && <ProfilePopover setOpenPopover={setOpen} />}
      </div>
    );
  }
}
