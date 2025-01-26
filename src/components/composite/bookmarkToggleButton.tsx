'use client';

import { useEffect, useState, useActionState } from 'react';
import { BookmarkIcon } from '@/components/icon';
import { useAnimationTimeout } from '@/hooks/useTemporal';
import { toggleBookmark } from '@/app/api/lecture.api';
import Form from 'next/form';
// import { useQuery } from '@tanstack/react-query';
import { twMerge } from 'tailwind-merge';

async function toggleBookmarkAction(currentState: FormState, formData: FormData): Promise<FormState> {
  const course_id = Number(formData.get('course_id'));
  return { result: await toggleBookmark({ course_id }) };
}

interface FormState {
  result: ApiResponse<unknown> | null;
}

interface Props {
  id: number;
  initialValue: boolean;
}

export default function BookmarkToggleButton({ id, initialValue }: Props) {
  const [b, setB] = useState(initialValue);
  const [shake, resetShake] = useAnimationTimeout(600);
  const [state, formAction, isPending] = useActionState(toggleBookmarkAction, { result: null });

  // const { data } = useQuery({ queryKey: ['bookmark', id], queryFn: () => courseDetail(id) });

  // useLayoutEffect(() => {
  //   if (data) {
  //     setB(data.data.isBookmark);
  //   }
  // }, [data]);

  useEffect(() => {
    if (state) {
      if (state.result?.status === 'SUCCESS') {
        setB((prev) => !prev);
        resetShake();
      }
    }
  }, [state]);

  return (
    <Form action={formAction} disabled={isPending}>
      <span
        className={twMerge(
          'transition-colors',
          b ? 'text-primary-500' : 'text-neutral-400 dark:text-neutral-600',
          isPending ? 'animate-pulse-beat' : '',
          shake ? 'animate-shake' : '',
          // !data ? 'text-white' : '',
        )}
      >
        <input name="course_id" value={id} className="hidden" readOnly />
        <button
          type="submit"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
        >
          <BookmarkIcon />
        </button>
      </span>
    </Form>
  );
}
