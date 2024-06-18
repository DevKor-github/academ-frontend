interface ProgressProps {
  accent?: string;
  style?: React.CSSProperties;
  rate: number;
}

const Progress: React.FC<ProgressProps> = ({ accent = '#a51330', rate, style }) => {
  const rate100 = Math.min(1, Math.max(0, rate)) * 100;

  const height = { height: '4px' };

  const combinedStyle: React.CSSProperties = {
    ...height,
    ...style,
    ...{ width: `${rate100}%` },
  };

  return (
    <div style={style}>
      <div className="bg-gray-200 rounded-lg" style={height}>
        <div className="bg-primary-500 rounded-lg transition-all" style={combinedStyle} />
      </div>
    </div>
  );
};

export default Progress;
