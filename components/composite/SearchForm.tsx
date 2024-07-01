'use client';

import { useState } from 'react';

import { VStack } from '@/components/basic/stack';
import { MagnifyIcon } from '@/icons';
import Button from '@/components/basic/button';
import { RightIcon } from '@/icons';

interface SearchFormProp {
  className?: string;
  defaultValue?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}

export default function SearchForm({ autoFocus, className, defaultValue, style }: SearchFormProp) {
  const [query, setQuery] = useState(defaultValue || '');

  const combinedStyle = {
    ...style,
    ...{ padding: '20px 0px' },
  };

  return (
    <form className={className} method="get" action="/lecture" style={combinedStyle}>
      <VStack
        gap="2px"
        className="transition-all justify-center items-center light:bg-neutral-100 dark:bg-neutral-900
       pl-5 pr-5 border border-neutral-200 dark:border-neutral-800 rounded-3xl focus-within:shadow-xl dark:shadow-dark-back-6
       "
      >
        <MagnifyIcon />
        <input
          required
          autoFocus={autoFocus}
          className="w-full pl-4 focus:border-none"
          id="text"
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
        <Button kind="blank" type="submit">
          <RightIcon />
        </Button>
      </VStack>
    </form>
  );
}
