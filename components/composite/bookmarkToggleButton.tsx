'use client';

import { useState } from 'react';
import { BookmarkIcon } from '@/icons';
import Button from '../basic/button';
import { apiBookmark } from '@/lib/api/course';
import { useSessionId } from '@/context/SessionIdContext';
import { useAnimationTimeout } from '@/lib/hooks/timeout';

export default function BookmarkToggleButton({
  id,
  onClick,
  defaultValue,
}: {
  id: number;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  defaultValue: boolean;
}) {
  const [b, setB] = useState(defaultValue);
  const [pulse, setPulse] = useState(false);
  const [shake, resetShake] = useAnimationTimeout(600);
  const [jwt] = useSessionId();

  function sendApiThenSetB(newB: boolean) {
    setPulse(true);
    apiBookmark({ course_id: id }, { token: jwt?.accessToken }).then((a) => {
      if (a.status === 'SUCCESS') {
        setB(newB);
      } else {
        resetShake();
      }
      setPulse(false);
    });
  }

  return (
    <span className={`
      ${b ? 'text-primary-500' : 'text-neutral-400 dark:text-neutral-600'}
      ${pulse ? 'animate-pulse' : ''}
      ${shake ? 'animate-shake' : ''}
      `}>
      <Button
        kind="blank"
        onClick={(e) => {
          onClick && onClick(e);
          sendApiThenSetB(!b);
        }}
      >
        <BookmarkIcon />
      </Button>
    </span>
  );
}
