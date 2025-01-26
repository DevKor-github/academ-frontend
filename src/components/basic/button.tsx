import React from 'react';
import { blankButton, buttonBase, filledButton, outlineButton } from '@/style/button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  // disabled?: boolean;
  kind?: 'filled' | 'outline' | 'blank';
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const CommonButton = ({ disabled, className, ...rest }: ButtonProps) => (
  <button className={buttonBase({ disabled, className })} disabled={disabled} {...rest} />
);

function FilledButton({ className = '', disabled, ...rest }: ButtonProps) {
  return <CommonButton disabled={disabled} className={filledButton({ disabled, className })} {...rest} />;
}

function OutlineButton({ className = '', disabled, ...rest }: ButtonProps) {
  return <CommonButton disabled={disabled} className={outlineButton({ disabled, className })} {...rest} />;
}

function BlankButton({ className = '', disabled, ...rest }: ButtonProps) {
  return <CommonButton disabled={disabled} className={blankButton({ disabled, className })} {...rest} />;
}

/**
 * @deprecated Use style/button instead
 */
export default function Button({ kind = 'filled', ...props }: ButtonProps) {
  switch (kind) {
    case 'filled':
      return FilledButton(props);
    case 'outline':
      return OutlineButton(props);
    case 'blank':
      return BlankButton(props);
  }
}
