'use client';

import { useState } from 'react';
import { BookmarkIcon } from '@/icons';
import Button from '../basic/button';
import { apiBookmark } from '@/lib/api/course';
import { useSessionId } from '@/context/SessionIdContext';

// This should be done after server provides bookmark read api
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
  const [jwt] = useSessionId();

  function sendApiThenSetB(newB: boolean) {
    apiBookmark({ course_id: id }, { token: jwt?.accessToken }).then((a) => {
      if (a.status === 'SUCCESS') {
        setB(newB);
      }
    });
  }

  return (
    <span className={b ? 'text-primary-500' : 'text-neutral-400 dark:text-neutral-600'}>
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
