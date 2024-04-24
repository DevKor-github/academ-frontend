import styles from './index.module.css';

interface ProgressProps {
  accent?: string;
  style?: React.CSSProperties;
  rate: number;
}

const Progress: React.FC<ProgressProps> = ({ accent = '#a51330', rate, style }) => {
  const rate100 = Math.min(1, Math.max(0, rate)) * 100;

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...{ backgroundColor: accent, width: `${rate100}%` },
  };

  return (
    <div className={styles.back} style={style}>
      <div className={styles.front} style={combinedStyle} />
    </div>
  );
};

export default Progress;
