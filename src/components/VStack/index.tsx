interface VStackProps {
  className?: string;
  gap?: string | number;
  children: React.ReactNode;
}

export default function VStack({ className, gap, children }: VStackProps) {
  return (
    <div
      className={className || ''}
      style={{ display: 'flex', flexDirection: 'row', columnGap: gap, color: 'inherit' }}
    >
      {children}
    </div>
  );
}
