'use client';

import { ReactNode } from 'react';
import { Box } from '../aux';
import Select from '@/components/basic/select';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useSearchKeyword from '../util';

interface Props {
  children: ReactNode;
}

const sortCriterias = [
  { value: 'NEWEST', label: '최신순' },
  { value: 'RATING_DESC', label: '별점 높은순' },
  { value: 'RATING_ASC', label: '별점 낮은순' },
] as const;

export default function SearchPage({ children }: Props) {
  const route = useRouter();
  const keyword = useSearchKeyword();

  const sCand = useSearchParams().get('s');
  const s = (Array.isArray(sCand) ? sCand[0] : sCand) || '';
  const sort: SearchOrdering = sortCriterias.map(({ value }) => value).includes(s as SearchOrdering)
    ? (s as SearchOrdering)
    : 'NEWEST';

  function handleValue(e: React.FormEvent<HTMLInputElement>) {
    const newOrder = (e.target as HTMLInputElement).value as SearchOrdering;
    route.replace(`/lecture?q=${keyword}&s=${newOrder}`);
  }

  return (
    <Box>
      <Select
        name="order"
        value={sort}
        handleValue={handleValue}
        items={
          [
            { value: 'NEWEST', label: '최신순' },
            { value: 'RATING_DESC', label: '별점 높은순' },
            { value: 'RATING_ASC', label: '별점 낮은순' },
          ] as const
        }
      />
      {children}
    </Box>
  );
}
