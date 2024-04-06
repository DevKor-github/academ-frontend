import { Box } from '@mui/material';

import { TopNav } from '../TopNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <TopNav />
      <Box display={'flex'} justifyContent={'center'}>
        {children}
      </Box>
    </Box>
  );
}
