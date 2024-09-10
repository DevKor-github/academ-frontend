interface ProgressProps {
  accent?: string;
  style?: React.CSSProperties;
  rate: number;
  reverse: boolean;
}

const Progress: React.FC<ProgressProps> = ({ rate, style, reverse }) => {
  const rate100 = Math.min(1, Math.max(0, rate)) * 100;
  let gradientColor: number;

  if (reverse) {
    gradientColor = rate100;
  } else {
    gradientColor = 120 - rate100;
  }

  const height = { height: '4px' };

  const combinedStyle: React.CSSProperties = {
    ...height,
    ...style,
    ...{ width: `${rate100}%`, backgroundColor: '#E65A76', opacity: `${gradientColor}%` },
  };

  return (
    <div style={style}>
      <div className="bg-gray-200 rounded-lg" style={height}>
        <div className="rounded-lg transition-all" style={combinedStyle} />
      </div>
    </div>
  );
};

export default Progress;
