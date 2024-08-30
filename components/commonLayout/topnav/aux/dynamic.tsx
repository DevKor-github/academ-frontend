'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useSessionId } from '@/context/SessionIdContext';

import Button from '@/components/basic/button';
import Popover from '@/components/basic/popover';
import { HStack } from '@/components/basic/stack';

import { apiMyPageBasics } from '@/lib/api/mypage';
import { ApiResponse } from '@/lib/api/builder';
import Skeleton from '@/components/composite/skeleton';

import { LogoutIcon, ProfileIcon } from './icons';
import { DownIcon } from '@/icons';

function ProfilePopover({ setOpenPopover }: { setOpenPopover: (b: boolean) => void }) {
  return (
    <Popover
      onPageClick={() => setOpenPopover(false)}
      className={
        'absolute rounded-xl overflow-hidden border bg-l bg-white dark:bg-dark-back-1 border-light-back-2 dark:border-dark-back-4 right-2 md:right-8 top-14 shadow-lg '
      }
      style={{ zIndex: 100 }}
    >
      <HStack className="justify-center items-center rounded-xl
      *:flex *:flex-row *:min-h-6 *:gap-2 *:p-4 *:pb-2 *:w-full *:justify-center *:align-middle">

        <Link className='
        hover:light:bg-light-back-2
        hover:dark:bg-dark-back-4' href="/mypage">
          <ProfileIcon />
          <span>마이페이지</span> 
        </Link>
        <Link className='
        hover:light:bg-light-back-2
        hover:dark:bg-dark-back-4' href="/logout">
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
      <Button>로그인/회원가입</Button>
    </Link>
  );
}

function ProfileButton() {
  const [jwt] = useSessionId();

  const [open, setOpen] = useState<boolean>(false);

  let [state, setState] = useState<null | ApiResponse<UserProfile>>(null);

  useEffect(() => {
    apiMyPageBasics({}, { token: jwt?.accessToken }).then((v) => setState(v));
  }, [jwt]);

  if (state === null) {
    return (
      <Button>
        <Skeleton placeholder="로그인/회원가입" />
      </Button>
    );
  }

  if (state.status !== 'SUCCESS') {
    return <LoginButton />;
  } else {
    return (
      <div>
        <Button className='rounded-full bg-primary-500 text-white p-2 pl-2 pr-2 cursor-pointer' onClick={() => setOpen((v) => !v)}>
          <span
            className="under-md:max-w-24"
            style={{ textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <span className='flex flex-row'>마이페이지 <DownIcon /></span>
          </span>
        </Button>
        {open && <ProfilePopover setOpenPopover={setOpen} />}
      </div>
    );
  }
}

export default function TopNavInnerRightClient() {
  return <ProfileButton />;
}
