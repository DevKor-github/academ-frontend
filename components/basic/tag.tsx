import React from 'react';

interface TagProps extends React.PropsWithChildren<{}> {
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const Tag: React.FC<TagProps> = ({ accent, children, className, ...restProps }: TagProps) => {
  return (
    <div className={`flex text-xs rounded-xl transition-all justify-center text-end items-center pl-1.5 pr-1.5 h-6 ${className}`} {...restProps}>
      {children}
    </div>
  );
};

export default Tag;
