'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { TopNavInnerLeft, TopNavInnerMid, TopNavRightLoading } from './aux/static';
import { twMerge } from 'tailwind-merge';

const TopNavRightClient = dynamic(() => import('./aux/dynamic'), {
  ssr: false,
  loading: TopNavRightLoading,
});

const TopNavInnerRight = () => {
  return (
    <div
      className="items-center justify-end flex text-black dark:text-white"
      style={{ height: '64px', width: '108px' }}
    >
      <TopNavRightClient />
    </div>
  );
};

export default function TopNav() {
  const path = usePathname() || '';
  const overlap = path === '/';

  const [spreaded, setSpreaded] = useState(false);

  return (
    <header>
      <div
        className={twMerge(
          'fixed z-50 top-0 w-full', // light:backdrop-blur-lg light:backdrop-contrast-10
          overlap
            ? ' text-white border-base-32 '
            : ' border-b light:border-b-base-30 dark:border-b-base-4 *:light:border-base-4 *:dark:border-base-32 text-black dark:text-white  ',
        )}
      >
        <div
          className={twMerge(
            'flex flex-row pl-2 pr-2 md:pl-8 md:pr-8 flex-nowrap items-start justify-between w-full transition-all',
            spreaded ? `h-72 md:h-16 md:bg-transparent` : 'h-16',
            overlap ? 'light:bg-black' /*  light:bg-opacity-50 */ : 'light:bg-white' /*  light:bg-opacity-50 */,
          )}
        >
          <TopNavInnerLeft />
          <TopNavInnerMid path={path} spreaded={spreaded} setSpreaded={setSpreaded} />
          <TopNavInnerRight />
        </div>
      </div>
      <div className={overlap ? 'hidden' : 'relative min-h-16'} />
    </header>
  );
}
