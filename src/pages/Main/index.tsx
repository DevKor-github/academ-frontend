import { Box, TextField, Typography, Button } from '@mui/material';

import { TopNav } from '../../components/TopNavigation';

export function MainPage() {
  return (
    <Box width={'100%'} position="absolute" top="0">
      <TopNav overlap={true} />
      <Box sx={{ width: '100%', position: 'absolute', top: 0 }}>
        <Box width={'100%'} height={'500px'} sx={{ backgroundColor: '#AAAAAA' }}></Box>
        <Box
          paddingX={3}
          paddingY={5}
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          position="relative"
        >
          <Box>
            <Typography variant="h4">강의명으로 검색해보세요</Typography>
          </Box>
          <Box>
            <TextField></TextField> <Button>검색</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
