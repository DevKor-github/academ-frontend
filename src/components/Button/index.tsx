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

export function Button({ label, ...restProps }: ButtonProps) {
  return (
    <button className={styles.primary} {...restProps}>
      {label}
    </button>
  );
}
