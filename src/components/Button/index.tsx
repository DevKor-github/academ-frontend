// import { Box } from '@mui/material';

import styles from './index.module.css';

interface ButtonProps {
  label: string;
  icon?: string;
  primary?: void;
  secondary?: void;
  success?: void;
  warning?: void;
  danger?: void;
  outline?: void;
  rounded?: void;
  [key: string]: unknown;
}

export function Button({ label, icon, ...restProps }: ButtonProps) {
  return (
    <button className={styles.primary} style={{ alignItems: 'center', color: 'inherit' }} {...restProps}>
      {icon && <img src={icon} style={{ aspectRatio: 1, height: '24px', width: 'auto' }} />}
      {label}
    </button>
  );
}
