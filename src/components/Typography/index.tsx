interface TypographyProp {
  variant: 't1' | 't2' | 't3' | 't4' | 't5' | 't6';
  children: React.ReactNode;
}

const fontSize = {
  t1: '32px',
  t2: '28px',
  t3: '24px',
  t4: '20x',
  t5: '16px',
  t6: '12px',
};

export default function Typography({ variant, children }: TypographyProp) {
  return (
    <span
      style={{
        fontSize: fontSize[variant],
      }}
    >
      {children}
    </span>
  );
}
