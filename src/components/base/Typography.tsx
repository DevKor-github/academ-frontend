import styles from './Typography.module.css';

interface TypographyProp {
  variant: 't1' | 't2' | 't3' | 't4' | 't5' | 't6';
  children: React.ReactNode;
  style?: React.CSSProperties;
  bold?: boolean;
  lineHeight?: string | number;
}

export default function Typography({ style, variant, children, bold, lineHeight }: TypographyProp) {
  const combinedStyle: React.CSSProperties = {
    ...(bold ? { fontWeight: 'bold' } : {}),
    ...{ lineHeight },
    ...style,
  };

  return (
    <span className={styles[variant]} style={combinedStyle}>
      <span>{children}</span>
    </span>
  );
}
