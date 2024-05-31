import styled from '@emotion/styled';

import styles from './index.module.css';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  kind?: 'filled' | 'outline' | 'blank';
  accent?: '-1' | '0' | '1';
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export const CommonButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  align-items: 'center';
  color: 'inherit';
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  padding: 8px;
`;

function FilledButton({ accent = '0', disabled, children, className, style, ...restProps }: ButtonProps) {
  return (
    <CommonButton
      tabIndex={0}
      className={`${styles.shared} ${styles.filled}
  ${styles[`accent${accent}`]}
  ${className}
  ${disabled ? styles.disabled : styles.enabled}`}
      {...restProps}
      style={style}
    >
      {children}
    </CommonButton>
  );
}

function OutlineButton({ accent = '0', disabled, children, className, style, ...restProps }: ButtonProps) {
  return (
    <CommonButton
      tabIndex={0}
      className={`${styles.shared} ${styles.outline}
  ${styles[`accent${accent}`]}
    ${className}
  ${disabled ? styles.disabled : styles.enabled}`}
      {...restProps}
      style={style}
    >
      {children}
    </CommonButton>
  );
}

function BlankButton({ accent = '0', disabled, children, className, style, ...restProps }: ButtonProps) {
  return (
    <CommonButton
      tabIndex={0}
      className={`${styles.blank}
  ${styles[`accent${accent}`]}
  ${className}
  ${disabled ? styles.disabled : styles.enabled}`}
      {...restProps}
      style={style}
    >
      {children}
    </CommonButton>
  );
}

export default function Button(props: ButtonProps) {
  switch (props.kind) {
    case 'outline':
      return OutlineButton(props);
    case 'blank':
      return BlankButton(props);
    default: /* filled */
      return FilledButton(props);
  }
}
