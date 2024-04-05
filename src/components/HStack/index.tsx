import { Box } from '@mui/material';

interface HStackProps {
  children: React.ReactNode;
}

export function HStack({ children }: HStackProps) {
  return <Box sx={{ display: 'flex', flexDirection: 'column' }}>{children}</Box>;
}
