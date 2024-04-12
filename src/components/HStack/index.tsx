interface HStackProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  type?: 'left' | 'right' | 'strech' | 'center';
  gap?: string | number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function HStack({ className, type = 'strech', gap, children, style }: HStackProps) {
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
