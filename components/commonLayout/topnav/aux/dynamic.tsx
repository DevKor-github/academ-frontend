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

function ProfilePopover({ setOpenPopover }: { setOpenPopover: (b: boolean) => void }) {
  return (
    <Popover
      onPageClick={() => setOpenPopover(false)}
      className={
        'absolute rounded-lg overflow-hidden border bg-l bg-white dark:bg-dark-back-1 border-light-back-2 dark:border-dark-back-4 right-2 md:right-8 top-14 shadow-lg '
      }
      style={{ zIndex: 100 }}
    >
      <HStack className="justify-center items-center rounded-xl">
        <Link href="/mypage">
          <ProfileIcon />
          마이페이지
        </Link>
        <Link href="/logout">
          <LogoutIcon />
          로그아웃
        </Link>
      </HStack>
    </Popover>
  );
}

function LoginButton() {
  return (
    <Link href="/login">
      <Button>로그인</Button>
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
        <Skeleton placeholder="로그인" />
      </Button>
    );
  }

  if (state.status !== 'SUCCESS') {
    return <LoginButton />;
  } else {
    return (
      <div>
        <Button onClick={() => setOpen((v) => !v)}>
          <span
            className="under-md:max-w-24"
            style={{ textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {state.data.username}님
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
