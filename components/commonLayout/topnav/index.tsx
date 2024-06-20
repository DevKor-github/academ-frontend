"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';

import Button from '@/components/basic/button';

import { HStack, VStack } from '@/components/basic/stack';
import { DownIcon, LogoIconRich, UpIcon } from '@/icons';
import Link from 'next/link';
import Skeleton from '@/components/composite/skeleton';

function TopNavInnerLeft() {
  return (
    <Link href="/" className='items-center justify-start flex text-black dark:text-white' style={{height: '64px', width : '108px'}}>
      <Button kind='blank'>
        <LogoIconRich width={`${150 * 0.6}px`} height={`${39 * 0.6}px`} />
      </Button>
    </Link>
  );
}

const TopNavInnerMid = ({ location, spreaded, setSpreaded }: { location: string, spreaded : boolean, setSpreaded : (b : boolean) => void }) => {
  

  const nbsp = '\u00A0';

  const height = (spreaded ? ' h-72 ' : ' h-16 ');

  return ( <div
      className={`overflow-hidden transition-all ${height} md:h-16 text-black dark:text-white items-center justify-start   flex flex-col md:flex-row`}
      style={{ rowGap : '10px' }}
  >
      <div className='md:hidden'>
        <Button kind='blank' style={{minHeight : '64px' }} onClick={() => setSpreaded(!spreaded)}>
            {spreaded ? <UpIcon /> : <DownIcon />}
        </Button>
      </div>
      <Link href="/lecture">
        <Button kind='blank' className={ (location) === '/lecture'? 'text-primary-500' : '' }>강의{nbsp}목록</Button>
      </Link>
      <Link href="/curation">
        <Button kind='blank' className={ (location) === '/curation'? 'text-primary-500' : '' }>강의{nbsp}추천</Button>
      </Link>
      <Link href="/timetable">
        <Button kind='blank' className={ (location) === '/timetable'? 'text-primary-500' : '' }>시간표</Button>
      </Link>
      <Link href="/notice">
        <Button kind='blank' className={ (location) === '/notice'? 'text-primary-500' : '' }>공지사항</Button>
    </Link>


    </div>
  );
};

function TopNavRightLoading() {
  return <Button><Skeleton placeholder='로그인' /></Button>;
}

const TopNavRightClient = dynamic(() => import('./client/topNavRight'), { ssr: false, loading : TopNavRightLoading});


const TopNavInnerRight = () =>
{
  return <div className='items-center justify-end flex text-black dark:text-white' style={{ height: '64px', width: '108px' }}>
    <TopNavRightClient />
  </div>;
}
export default function TopNav({
  className,
  location,
}: {
    className: string;
    location: string;
  }) {
  
  const overlap = location === '/';

  const [spreaded, setSpreaded] = useState(false);

  return <div className={"w-full " + (overlap ? " dark z-50  " : "border-b border-b-neutral-400 ")}>
    <VStack className={
      `${spreaded ?
        ` h-72 md:h-16 md:bg-transparent
          ${overlap /* dark */ ?
          " bg-neutral-800 " :
          " bg-white dark:bg-black "}`
        : " h-16 bg-none "}
      pl-2 pr-2 md:pl-8 md:pr-8 ${className} flex flex-nowrap items-start flex-row justify-between w-full transition-all`}>
      <TopNavInnerLeft />
      <TopNavInnerMid location={location} spreaded={spreaded} setSpreaded={setSpreaded} />
      <TopNavInnerRight />
    </VStack></div>;
}
