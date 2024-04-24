import { useState } from 'react';
import { Box } from '@mui/material';

interface SlideShowProps {
  imgs: string[];
}

export function SlideShow({ imgs }: SlideShowProps) {
  const [showing, setShowing] = useState(0);
  return <Box>{`showing ${showing}th Image : imgs ${imgs} are src of Image`}</Box>;
}
