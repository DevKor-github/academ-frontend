import { Box, TextField, Typography } from '@mui/material';

import { TopNav, Footer, HStack, Button, VStack } from '../../components';

export function MainPage() {
  return (
    <HStack>
      <Box width={'100%'} position="absolute" top="0">
        <TopNav overlap />
        <Box width={'100%'} height={'500px'} sx={{ backgroundColor: '#AAAAAA', position: 'absolute', top: 0 }}></Box>
      </Box>
      <Box sx={{ width: '100%', position: 'relative', top: '500px' }}>
        <Box
          paddingX={3}
          paddingY={5}
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          position="relative"
        >
          <HStack>
            <Typography variant="h4">강의명으로 검색해보세요</Typography>
            <Typography variant="h6">e.g., Lorem Ipsum, Lorem Ipsum</Typography>
            <VStack>
              <TextField></TextField> <Button>검색</Button>
            </VStack>
          </HStack>
        </Box>
      </Box>
      <Footer />
    </HStack>
  );
}
