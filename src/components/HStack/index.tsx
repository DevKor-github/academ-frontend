interface HStackProps {
  className?: string;
  type?: 'left' | 'right' | 'strech';
  gap?: string | number;
  children: React.ReactNode;
}

export default function HStack({ className, type = 'strech', gap, children }: HStackProps) {
  return (
    <div
      className={className || ''}
      style={{
        display: 'flex',
        flexDirection: 'column',

        // eslint-disable-next-line no-nested-ternary
        alignItems: type,
        rowGap: gap,
      }}
    >
      {children}
    </div>
  );
}
