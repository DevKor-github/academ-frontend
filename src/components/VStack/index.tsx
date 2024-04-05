import { Box } from '@mui/material';

interface VStackProps {
  children: React.ReactNode;
}

export function VStack({ children }: VStackProps) {
  return <Box sx={{ display: 'flex', flexDirection: 'row' }}>{children}</Box>;
}
