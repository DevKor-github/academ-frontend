interface HStackProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  type?: 'left' | 'right' | 'strech' | 'center';
  gap?: string | number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function HStack({ className, type = 'strech', gap, children, style, ...restProps }: HStackProps) {
  const combinedStyle: React.CSSProperties = {
    ...{
      display: 'flex',
      flexDirection: 'column',
      alignItems: type,
      rowGap: gap,
    },
    ...style,
  };

  return (
    <div className={className || ''} style={combinedStyle} {...restProps}>
      {children}
    </div>
  );
}

interface VStackProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  gap?: string | number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function VStack({ style, className, gap, children, ...restProps }: VStackProps) {
  const combinedStyle: React.CSSProperties = {
    ...{ display: 'flex', flexDirection: 'row', columnGap: gap, rowGap: gap, color: 'inherit' },
    ...style,
  };

  return (
    <div className={className || ''} style={combinedStyle} {...restProps}>
      {children}
    </div>
  );
}
