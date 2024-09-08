interface ProgressProps {
  accent?: string;
  style?: React.CSSProperties;
  rate: number;
  reverse: boolean;
}

const Progress: React.FC<ProgressProps> = ({ rate, style, reverse }) => {
  const rate100 = Math.min(1, Math.max(0, rate)) * 100;

  const color = ['#DC143C', '#FF8838', '#FFE66B', '#D2F749', '#1BBE66'];
  let gradientColor: string;

  const idx = Math.floor((Math.max(20, rate100) - 20) / 17);

  if (reverse) {
    gradientColor = color.toReversed()[idx];
  } else {
    gradientColor = color[idx];
  }

  const height = { height: '4px' };

  const combinedStyle: React.CSSProperties = {
    ...height,
    ...style,
    ...{ width: `${rate100}%`, backgroundColor: gradientColor },
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
