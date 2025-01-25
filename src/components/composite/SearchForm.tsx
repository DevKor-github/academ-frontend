'use client';

import { MagnifyIcon, RightIcon } from '@/components/icon';
import ErrorLabel from '../basic/errorlabel';

import { useState } from 'react';
import { useAnimationTimeout } from '@/hooks/useTemporal';

interface SearchFormProp {
  className?: string;
  defaultValue?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}

export default function SearchForm({ autoFocus, className, defaultValue, style }: SearchFormProp) {
  const [query, setQuery] = useState(defaultValue || '');
  const [error, setError] = useState('');
  const [isAnimation, resetAnimation] = useAnimationTimeout(600);

  const combinedStyle = {
    ...style,
    ...{ padding: '20px 0px' },
  };

  function submitHanlder(event: React.FormEvent<HTMLFormElement>) {
    if (query.length < 2) {
      event.preventDefault();
      resetAnimation();
      setError('검색어를 2자 이상 입력해주세요.');
    }
  }

  return (
    <form className={className} method="get" action="/lecture" style={combinedStyle} onSubmit={submitHanlder}>
      <div
        className="flex flex-row gap-2 transition-all justify-center items-center light:bg-neutral-100 dark:bg-neutral-900
       px-5 border border-neutral-200 dark:border-neutral-800 rounded-3xl focus-within:shadow-xl dark:shadow-base-6"
      >
        <MagnifyIcon />
        <input
          // required
          autoFocus={autoFocus}
          className="w-full px-8 focus-within:outline-none"
          id="q"
          name="q"
          placeholder={'검색'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            border: 'none',
            fontSize: '16px',
            padding: '20px 0px',
            background: 'none',
          }}
        />
        <button type="submit">
          <RightIcon />
        </button>
      </div>
      <ErrorLabel className="mt-4" label={error} shake={isAnimation} />
    </form>
  );
}
