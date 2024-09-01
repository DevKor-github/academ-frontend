import React from 'react';

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const Tag: React.FC<TagProps> = ({ accent, children, className, ...restProps }: TagProps) => {
  return (
    <div
      className={`flex text-xs rounded-full transition-all justify-center text-end items-center px-4 h-7 bg-neutral-100 text-neutral-500 ${className}`}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Tag;
