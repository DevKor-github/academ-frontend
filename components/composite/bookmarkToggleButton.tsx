'use client';

import { useState } from 'react';
import { BookmarkIcon } from '@/icons';
import { apiBookmark } from '@/lib/api/calls/course';
import { useAnimationTimeout } from '@/lib/hooks/timeout';

export default function BookmarkToggleButton({ id, defaultValue }: { id: number; defaultValue: boolean }) {
  const [b, setB] = useState(defaultValue);
  const [pulse, setPulse] = useState(false);
  const [shake, resetShake] = useAnimationTimeout(600);


  function sendApiThenSetB(newB: boolean) {
    setPulse(true);
    apiBookmark({ course_id: id }).then((a) => {
      if (a.status === 'SUCCESS') {
        setB(newB);
      } else {
        resetShake();
      }
      setPulse(false);
    });
  }

  return (
    <span
      className={`
      ${b ? 'text-primary-500' : 'text-neutral-400 dark:text-neutral-600'}
      ${pulse ? 'animate-pulse-beat' : ''}
      ${shake ? 'animate-shake' : ''}
      `}
    >
      <button
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          sendApiThenSetB(!b);
        }}
      >
        <BookmarkIcon />
      </button>
    </span>
  );
}
