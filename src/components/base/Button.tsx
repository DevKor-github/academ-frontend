// import { Box } from '@mui/material';

import Typography from './Typography';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  style?: 'filled' | 'outline' | 'blank';
  accent?: '-1' | '0' | '1';

  [key: string]: unknown;
}

export default function Button({ style = 'filled', accent = '0', disabled, children, ...restProps }: ButtonProps) {
  return (
    <button
      tabIndex={0}
      className={`${styles.shared} ${styles[style]}

      ${styles[`accent${accent}`]}
      
      ${disabled ? styles.disabled : styles.enabled}`}
      {...restProps}
    >
      <Typography variant="t5">{children}</Typography>
    </button>
  );
}
