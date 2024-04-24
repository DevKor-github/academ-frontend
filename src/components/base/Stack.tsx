interface HStackProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  type?: 'left' | 'right' | 'strech' | 'center';
  gap?: string | number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function HStack({ className, type = 'strech', gap, children, style }: HStackProps) {
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...{
      display: 'flex',
      flexDirection: 'column',
      alignItems: type,
      rowGap: gap,
    },
  };

  return (
    <div className={className || ''} style={combinedStyle}>
      {children}
    </div>
  );
}

interface VStackProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  gap?: string | number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function VStack({ style, className, gap, children }: VStackProps) {
  const combinedStyle: React.CSSProperties = {
    ...style,

    ...{ display: 'flex', flexDirection: 'row', columnGap: gap, color: 'inherit' },
  };

  return (
    <div className={className || ''} style={combinedStyle}>
      {children}
    </div>
  );
}
