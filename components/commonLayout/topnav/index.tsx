'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation'

import { VStack } from '@/components/basic/stack';

import { TopNavInnerLeft, TopNavInnerMid, TopNavRightLoading } from './inner/static';

const TopNavRightClient = dynamic(() => import('./inner/dynamic'), { ssr: false, loading: TopNavRightLoading });

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

  const path = usePathname();
  const overlap = path === '/';
  const className = overlap ? 'absolute top-0 z-50' : 'relative';

  const [spreaded, setSpreaded] = useState(false);

  return (
    <div
    className={
        'w-full ' + (overlap ? ' dark z-50 text-white  ' : 'border-b light:border-b-light-back-2 dark:border-b-dark-back-4 ')
      }
    >
      <VStack
        className={`${
          spreaded
            ? ` h-72 md:h-16 md:bg-transparent
          ${overlap /* dark */ ? ' bg-dark-back-5  ' : ' text-black dark:text-white bg-white dark:bg-dark-back-5 '}`
            : ' h-16 bg-none '
        }
      pl-2 pr-2 md:pl-8 md:pr-8 ${className} flex flex-nowrap items-start flex-row justify-between w-full transition-all`}
      >
        <TopNavInnerLeft />
        <TopNavInnerMid path={path} spreaded={spreaded} setSpreaded={setSpreaded} />
        <TopNavInnerRight />
      </VStack>
    </div>
  );
}
