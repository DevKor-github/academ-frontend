import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  // disabled?: boolean;
  kind?: 'filled' | 'outline' | 'blank';
  style?: React.CSSProperties;
  [key: string]: unknown;
} 

const CommonButton = ({ disabled, className, ...rest }: ButtonProps) => (
  <button className={`flex justify-center items-center rounded-lg transition-all p-2 bg-none ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`} {...rest} />
);

function FilledButton({ disabled, ...rest } : ButtonProps) {
  return (disabled ?
      <CommonButton disabled className="bg-gray-300 dark:bg-gray-700 border-none" {...rest} /> :
      <CommonButton className="bg-primary-500 cursor-pointer border-none"  {...rest} />);
}

function OutlineButton({ disabled, ...rest }: ButtonProps) {
  return (
    disabled ?
      <CommonButton disabled className="border-gray-300 dark:border-gray-700 border" {...rest} /> :
      <CommonButton className="border-primary-500 border" {...rest} />
  );
}

function BlankButton({ disabled, ...rest }: ButtonProps) {
  return (
    disabled ?
      <CommonButton disabled className="border-none" {...rest} /> :
      <CommonButton className="border-none hover:opacity-50" {...rest} />
  );
}

export default function Button({kind = 'filled', ...props}: ButtonProps) {
  switch (kind) {
    case 'filled':
      return FilledButton(props);
    case 'outline':
      return OutlineButton(props);
    case 'blank':
      return BlankButton(props);
  }
}
