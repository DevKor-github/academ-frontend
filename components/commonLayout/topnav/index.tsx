"use client";

import { useSessionId } from '@/context/SessionIdContext';
import { useState } from 'react';
import carouselItems from '../carousel/carouselItems';

import { Dark } from '@/context/ThemeContext';

import Button from '@/components/basic/button';

import { VStack, HStack } from '@/components/basic/stack';
import Popover from '../../basic/popover';
import Carousel from '../carousel/carousel';
import { LogoIconRich, DownIcon, UpIcon } from '@/icons';
import Link from 'next/link';

import popoverStyles from './popover.module.css';
import styles from './index.module.css';

function TopNavInnerLeft({ overlap }: { overlap?: boolean }) {
  return (
    <Link href="/">
      <Button kind='blank'>
        <LogoIconRich width={`${150 * 0.6}px`} height={`${39 * 0.6}px`} />
      </Button>
    </Link>
  );
}

const TopNavInnerMid = ({location} : {location : string}) => {

  const nbsp = '\u00A0';

  return (
    <VStack
      className='items-center justify-center'
      gap='10px'
      style={{ height: '72px', }}
    >
      <Link href="/lecture">
        <Button kind='blank' className={ (location) === '/lecture'? 'text-primary-500' : '' }>강의{nbsp}목록</Button>
      </Link>
      <Link href="/curation">
        <Button kind='blank' selected={ (location) === '/curation'? 'text-primary-500' : '' }>강의{nbsp}추천</Button>
      </Link>
      <Link href="/timetable">
        <Button kind='blank' selected={ (location) === '/timetable'? 'text-primary-500' : '' }>시간표</Button>
      </Link>
      <Link href="/notice">
        <Button kind='blank' selected={ (location) === '/notice'? 'text-primary-500' : '' }>공지사항</Button>
      </Link>
    </VStack>
  );
};


function TopNavInnerRight({ overlap }: { overlap?: boolean }) {
  const { sessionId } = useSessionId();

  (function ignore(x) {
    return x;
  })(overlap);

  const [openPopover, setOpenPopover] = useState<boolean>(false);
  return sessionId ? (
    <div>
      <Button  pill onClick={() => setOpenPopover(!openPopover)}>
        <span className={styles.forSmall} style={{ textWrap: 'nowrap', overflow: 'hidden' }}>
          프사
        </span>
        <span className='hidden md:inline-flex' style={{ textWrap: 'nowrap', overflow: 'hidden' }}>
          {sessionId}님
        </span>
      </Button>
      {openPopover && (
        <Popover onClose={() => setOpenPopover(false)} className={popoverStyles.popover}>
          <HStack style={{  borderRadius: '12px' }}>
            <Button href="/mypage">마이페이지</Button>
            <Button href="/logout">로그아웃</Button>
            <Button onClick={() => setOpenPopover(false)}>닫기</Button>
          </HStack>
        </Popover>
      )}
    </div>
  ) : (
      <Link href="/login">
        <Button>
          로그인
        </Button>
      </Link>
  );
}




export default function TopNav({
  className,
  location,
}: {
    className: string;
    location: string;
  }) {
  
  const [spreaded, setSpreaded] = useState(false);
  
  
  const overlap = location === '/';

  return (
    <HStack
      className={`pl-2 pr-2 md:pl-8 md:pr-8 ${className} bg-none overflow-hidden flex flex-nowrap items-start flex-row justify-between w-full transition-all ${overlap ? " dark z-50 " : styles.line}`}
      style={{ minHeight: spreaded ? '120px' : '72px', height: spreaded ? '120px' : '72px'}}
    >
      <VStack className='bg-none w-full items-center justify-between  text-neutral-950 dark:text-neutral-50' style={{ height: '72px'  }}>
        <TopNavInnerLeft overlap={overlap} />
        <div className={styles.forSmall} style={{ height: '72px' }}>
            <Button kind='blank' onClick={() => setSpreaded(!spreaded)}>
              {spreaded ? <UpIcon width="24px" height="24px" /> : <DownIcon width="24px" height="24px" />}
            </Button>
        </div>
        <div className='hidden md:inline-flex' style={{ height: '72px' }}>
          <TopNavInnerMid location={location} />
        </div>
        <TopNavInnerRight overlap={overlap} />
      </VStack>
      <div
        className={styles.forSmall + " text-neutral-950 dark:text-neutral-50"}
        style={{ width: '100%', height: 'auto', marginBottom: '24px', overflowX: 'scroll', overflowY: 'hidden', justifyContent : 'center', alignItems : 'center'}}
      >
        <TopNavInnerMid location={location} />
      </div>
    </HStack>
  );
}
