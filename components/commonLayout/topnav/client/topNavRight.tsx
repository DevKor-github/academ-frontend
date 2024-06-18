"use client";

import { useEffect } from "react";
import { useSessionId } from "@/context/SessionIdContext";

import { useState } from "react";

import styles from '../index.module.css';

import Button from "@/components/basic/button";
import Popover from "@/components/basic/popover";
import Link from "next/link";
import { HStack } from "@/components/basic/stack";

function ProfilePopover({ setOpenPopover } : { setOpenPopover : (b : boolean) => void }) {
  return <Popover onPageClick={() => setOpenPopover(false)} className={"absolute rounded-lg overflow-hidden border border-neutral-600 right-2 md:right-8 top-16 "}>
    <HStack className="justify-center items-center" style={{ borderRadius: '12px' }}>
      <Link href="/mypage">
        <Button kind='blank'  >마이페이지</Button>
      </Link>
      <Link href="/logout">
        <Button kind='blank'  >로그아웃</Button>
      </Link>
      <Button kind='blank' onClick={() => setOpenPopover(false)}>닫기</Button>
    </HStack>
  </Popover>;
}

function LoginButton() {
  return <Link href="/login">
    <Button>
      로그인
    </Button>
  </Link>;
}

function ProfileButton() {
  const { sessionId } = useSessionId();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log('State after toggle request:', open);
  }, [open]);

  if (sessionId === null) {
    return <LoginButton />;
  } else {
    return <div>
      <Button onClick={() => setOpen(v => !v)}>
        <span className={styles.forSmall} style={{ textWrap: 'nowrap', overflow: 'hidden' }}>
          프사
        </span>
        <span className='hidden md:inline-flex' style={{ textWrap: 'nowrap', overflow: 'hidden' }}>
          {sessionId.username}님
        </span>
      </Button>
      {open && <ProfilePopover setOpenPopover={setOpen} /> }
    </div>
  }
}

export default function TopNavInnerRightClient() {
  return <ProfileButton />
}