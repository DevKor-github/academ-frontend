interface TypographyProp {
  variant: 't1' | 't2' | 't3' | 't4' | 't5' | 't6';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const fontSize = {
  t1: '32px',
  t2: '28px',
  t3: '24px',
  t4: '20px',
  t5: '16px',
  t6: '12px',
};

export default function Typography({ style, variant, children }: TypographyProp) {
  const combinedStyle: React.CSSProperties = {
    ...style,

    ...{
      fontSize: fontSize[variant],
    },
  };

  return <span style={combinedStyle}>{children}</span>;
}
