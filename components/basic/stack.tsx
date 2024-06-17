import React from 'react';

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {

  gap?: string;
}

export function HStack({ className = "", gap,style, children }: StackProps) {
  const combinedStyle: React.CSSProperties  = {
    ...{ rowGap: gap },
    ... style,
  }
  return <div className={"flex flex-col " + className} style={combinedStyle}> { children }</div>;
}

export function VStack({ className = "", gap, style,children }: StackProps) {
  const combinedStyle : React.CSSProperties = {
    ...{ columnGap: gap },
    ... style,
    
  }
  return <div className={"flex flex-row " + className} style={combinedStyle}> { children }</div>;
}


