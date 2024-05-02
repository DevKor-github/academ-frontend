import styles from './Typography.module.css';

interface TypographyProp {
  variant: 't1' | 't2' | 't3' | 't4' | 't5' | 't6';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Typography({ style, variant, children }: TypographyProp) {
  const combinedStyle: React.CSSProperties = {
    ...style,
  };

  return (
    <span className={styles[variant]} style={combinedStyle}>
      <span>{children}</span>
    </span>
  );
}
