"use client";

import { useSessionId } from "@/context/SessionIdContext";
 import { SessionIdProvider } from "@/context/SessionIdContext";

import { useState } from "react";

import styles from '../index.module.css';

import Button from "@/components/basic/button";
import Popover from "@/components/basic/popover";
import Link from "next/link";
import { HStack } from "@/components/basic/stack";

import popoverStyles from './popover.module.css';


function ProfilePopover({ setOpenPopover } : { setOpenPopover : (b : boolean) => void }) {
  return <Popover onClose={() => setOpenPopover(false)} className={popoverStyles.popover}>
    <HStack style={{ borderRadius: '12px' }}>
      <Link href="/mypage">
        <Button >마이페이지</Button>
      </Link>
      <Link href="/logout">
        <Button >로그아웃</Button>
      </Link>
      <Button onClick={() => setOpenPopover(false)}>닫기</Button>
    </HStack>
  </Popover>;
}


function ProfileButton() {
  const { sessionId } = useSessionId();

  const [openPopover, setOpenPopover] = useState<boolean>(false);
  return sessionId ? (
    <div>
      <Button pill onClick={() => setOpenPopover(!openPopover)}>
        <span className={styles.forSmall} style={{ textWrap: 'nowrap', overflow: 'hidden' }}>
          프사
        </span>
        <span className='hidden md:inline-flex' style={{ textWrap: 'nowrap', overflow: 'hidden' }}>
          {sessionId}님
        </span>
      </Button>
      {openPopover && <ProfilePopover setOpenPopover={setOpenPopover} /> }
    </div>
  ) : (
      <Button>
    <Link href="/login">
          로그인
    </Link>
          
      </Button>
  );
}

export default function TopNavInnerRightClient() {
  return <SessionIdProvider><ProfileButton /></SessionIdProvider>
}