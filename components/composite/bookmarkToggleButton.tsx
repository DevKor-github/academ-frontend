'use client';

import { useLayoutEffect, useState } from 'react';
import { BookmarkIcon } from '@/components/icon';
import { apiBookmark, apiCourseDetail } from '@/lib/api-client/calls/course';
import { useAnimationTimeout } from '@/lib/hooks/timeout';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';
import { useQuery } from '@tanstack/react-query';

export default function BookmarkToggleButton({ id }: { id: number }) {
  const [{ instances }] = useAuthTokens();

  const { data: courseData } = useQuery({
    queryKey: ['course', id],
    queryFn: async () =>  await apiCourseDetail(instances.doRefresh, { course_id: id, order: 'NEWEST', page: 1 }),
  });

  const [b, setB] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [shake, resetShake] = useAnimationTimeout(600);

  useLayoutEffect(() => {
    if (courseData) {
      setB(courseData.data.isBookmark);
    }
  }, [courseData]);


  function sendApiThenSetB(newB: boolean) {
    setPulse(true);
    apiBookmark(instances.doRefresh, { course_id: id }).then((a) => {
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
