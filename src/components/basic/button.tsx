import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  // disabled?: boolean;
  kind?: 'filled' | 'outline' | 'blank';
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const CommonButton = ({ disabled, className, ...rest }: ButtonProps) => (
  <button
    className={twMerge(
      `flex justify-center items-center rounded-lg transition-all p-2 whitespace-nowrap ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`,
      className,
    )}
    disabled={disabled}
    {...rest}
  />
);

function FilledButton({ className = '', disabled, ...rest }: ButtonProps) {
  return disabled ? (
    <CommonButton
      disabled={true}
      className={twMerge(' bg-gray-300 dark:bg-gray-700 border-none opacity-25 ', className)}
      {...rest}
    />
  ) : (
    <CommonButton
      className={twMerge('bg-primary-500 cursor-pointer border-none text-white dark:text-white ', className)}
      {...rest}
    />
  );
}

function OutlineButton({ className = '', disabled, ...rest }: ButtonProps) {
  return disabled ? (
    <CommonButton
      disabled
      className={'border-gray-300 dark:border-gray-700 border opacity-25 ' + className}
      {...rest}
    />
  ) : (
    <CommonButton className={'border-primary-500 border ' + className} {...rest} />
  );
}

function BlankButton({ className = '', disabled, ...rest }: ButtonProps) {
  return disabled ? (
    <CommonButton disabled className={'border-none opacity-25 ' + className} {...rest} />
  ) : (
    <CommonButton className={'border-none hover:opacity-50' + className} {...rest} />
  );
}

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
