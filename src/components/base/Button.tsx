import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  kind?: 'filled' | 'outline' | 'blank';
  accent?: '-1' | '0' | '1';
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export default function Button({
  kind = 'filled',
  accent = '0',
  disabled,
  children,
  className,
  style,
  ...restProps
}: ButtonProps) {
  return (
    <button
      tabIndex={0}
      className={`${styles.shared} ${styles[kind]}
      ${styles[`accent${accent}`]}
      ${className}
      ${disabled ? styles.disabled : styles.enabled}`}
      {...restProps}
      style={style}
    >
      {children}
    </button>
  );
}
