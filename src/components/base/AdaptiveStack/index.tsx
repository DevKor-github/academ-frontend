import styles from './index.module.css';

interface AdaptiveStackProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;

  vGap?: string | number;
  hGap?: string | number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function AdaptiveStack({ className, vGap, hGap, children, style }: AdaptiveStackProps) {
  const combinedStyle = { ...style, ...{ columnGap: vGap, rowGap: hGap } };

  return (
    <div className={`${styles.main} ${className}`} style={combinedStyle}>
      {children}
    </div>
  );
}
