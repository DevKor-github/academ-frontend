'use client';

import Link from 'next/link';
import Button from '@/components/basic/button';
import { DownIcon } from '@/components/icon';
import { logout } from '@/app/actions/logout.action';
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { blankButton } from '@/style/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isTokenExists } from '@/util/auth.util';
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
    queryFn: async () => (await isTokenExists()) !== undefined,
  });

  const qc = useQueryClient();

  if (loggedIn === undefined) {
    return (
      <Button className="rounded-full px-5">
        <span className="whitespace-nowrap">
          <Skeleton placeholder="로그인/회원가입" />
        </span>
      </Button>
    );
  }

  if (
    // state.status !== 'SUCCESS'
    !loggedIn
  ) {
    return <LoginButton />;
  } else {
    return (
      <Menu>
        <MenuButton className="rounded-full bg-primary-500 text-white p-2 pl-2 pr-2 w-32">
          <span
            className="under-md:max-w-24"
            style={{ textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <span className="flex flex-row items-center justify-center gap-2">
              마이페이지 <DownIcon />
            </span>
          </span>
        </MenuButton>
        {/* <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
            Solutions
          </PopoverButton> */}
        <MenuItems
          // transition
          anchor="bottom"
          className="z-[200] relative rounded-xl border bg-l mt-2 bg-white dark:bg-base-1 shadow-lg justify-center items-center
      *:flex *:flex-row *:min-h-6 *:gap-2 *:p-4 *:pb-2 *:w-full *:justify-center *:align-middle"
        >
          <MenuItem>
            <Link
              className={blankButton({
                disabled: false,
                className: 'hover:light:bg-base-30 size-full hover:dark:bg-base-4',
              })}
              href="/mypage"
            >
              <UserIcon size={18} />
              <span>마이페이지</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              type="submit"
              className={blankButton({
                disabled: false,
                className: 'hover:light:bg-base-30 size-full hover:dark:bg-base-4',
              })}
              onClick={() => {
                logout();
                qc.resetQueries();
              }}
            >
              <LogOutIcon size={18} />
              <span>로그아웃</span>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    );
  }
}
