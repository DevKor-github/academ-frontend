// import { Box } from '@mui/material';

import Typography from '../Typography';

import styles from './index.module.css';

interface ButtonProps {
  children: React.ReactNode;

  disabled?: boolean;
  icon?: string;
  style?: 'primary' | 'outline';
  accent?: '-1' | '0' | '1';

  [key: string]: unknown;
}
export default function Button({
  style = 'primary',
  accent = '0',
  disabled,
  children,
  icon,
  ...restProps
}: ButtonProps) {
  return (
    <button
      tabIndex={0}
      className={`${styles.shared} ${style === 'primary' ? styles.primary : styles.outline}

      ${styles[`accent${accent}`]}
      
      ${disabled ? styles.disabled : styles.enabled}`}
      {...restProps}
    >
      {icon && <img src={icon} style={{ aspectRatio: 1, height: '24px', width: 'auto' }} />}
      <Typography variant="t5">{children}</Typography>
    </button>
  );
}
