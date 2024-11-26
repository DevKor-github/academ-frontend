import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const Tag: React.FC<TagProps> = ({ children, className, ...restProps }: TagProps) => {
  return (
    <div
      className={twMerge(
        `flex text-xs rounded-full transition-all justify-center text-center items-center px-4 py-1 bg-neutral-100 text-neutral-500`,
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Tag;
