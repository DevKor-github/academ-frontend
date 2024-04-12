import { useState } from 'react';
import { Box } from '@mui/material';

import { HStack, Button, VStack, Input, Typography, Spacer } from '../../components';

function SearchBox() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <Input label="asfd" value={query} onChange={(e) => setQuery(e.target.value)} />
      <Button type="submit">검색</Button>
    </div>
  );
}

export function MainPage() {
  return (
    <Box
      width="100%"
      paddingX={3}
      paddingY={5}
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      position="relative"
    >
      <HStack type="center" gap="40px">
        <HStack type="center" gap="5px">
          <Typography variant="t1">강의명으로 검색해보세요</Typography>
          <Typography variant="t3">e.g., Lorem Ipsum, Lorem Ipsum</Typography>
        </HStack>
        <VStack>
          {/* <Form
              onSubmit={(e) => {
                e.preventDefault();
                alert(query);
              }}
            > */}
          <SearchBox />
          {/* </Form> */}
        </VStack>
        <Spacer />
      </HStack>
    </Box>
  );
}
