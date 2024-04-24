import { useState } from 'react';

import { HStack, Button, VStack, Input, Typography, Spacer } from '../components';

function SearchForm() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <Input label="" value={query} onChange={(e) => setQuery(e.target.value)} />
      <Button type="submit">검색</Button>
    </div>
  );
}

export function MainPage() {
  return (
    <HStack type="center" style={{ padding: '24px 0px' }}>
      <HStack type="center" gap="5px">
        <Typography variant="t2">
          <b>강의명</b>으로 검색해보세요
        </Typography>
        <Typography variant="t5">e.g., Lorem Ipsum, Lorem Ipsum</Typography>
      </HStack>
      <VStack>
        <SearchForm />
      </VStack>
      <Spacer />
    </HStack>
  );
}
