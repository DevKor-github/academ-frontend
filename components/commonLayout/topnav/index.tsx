'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation'

import { VStack } from '@/components/basic/stack';

import { TopNavInnerLeft, TopNavInnerMid, TopNavRightLoading } from './aux/static';

const TopNavRightClient = dynamic(() => import('./aux/dynamic'), { ssr: false, loading: TopNavRightLoading });

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
  const overlap = path === '/' ;
  const className = overlap ? 'absolute top-0 z-50' : 'relative';

  const [spreaded, setSpreaded] = useState(false);

  return (
    <nav>
      <div className={
        'fixed z-50 top-0 w-full ' +
        (overlap ? ' text-white  ' : ' border-b light:border-b-light-back-2 dark:border-b-dark-back-4 ')}>
      <VStack
          className={`pl-2 pr-2 md:pl-8 md:pr-8 ${className} flex flex-nowrap items-start flex-row justify-between w-full transition-all 
          backdrop-blur-lg `
            +
            (spreaded ? `h-72 md:h-16 md:bg-transparent ` : ' h-16 ')
            +
            (spreaded && overlap /* dark */ ? ' bg-dark-back-5 ' : '')
            +
            (!spreaded && overlap ? ' bg-dark-back-1 bg-opacity-50 ' : ' ')
            +
            (spreaded && !overlap ? ' text-black dark:text-white bg-white dark:bg-dark-back-5 ' : '')
        
      }
      >
          <TopNavInnerLeft />
          <TopNavInnerMid path={path} spreaded={spreaded} setSpreaded={setSpreaded} />
          <TopNavInnerRight />
        </VStack>
      </div>
      <div className={(overlap ? 'hidden' : 'min-h-16')} />
    </nav>
  );
}
