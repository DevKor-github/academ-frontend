interface VStackProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  gap?: string | number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function VStack({ style, className, gap, children }: VStackProps) {
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
