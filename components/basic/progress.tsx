interface ProgressProps {
  accent?: string;
  style?: React.CSSProperties;
  rate: number;
  reverse: boolean;
}

const interpolateColors = (color1: number[], color2: number[], t: number) => {
  return color1.map((start, index) => Math.round(start + (color2[index] - start) * t));
};

const Progress: React.FC<ProgressProps> = ({ accent = '#a51330', rate, style, reverse }) => {
  const rate100 = Math.min(1, Math.max(0, rate)) * 100;

  let startColor: number[], midColor: number[], endColor: number[];

  const red = [220, 20, 60];
  const yellow = [255, 255, 60];
  const green = [27, 190, 102];

  if (reverse) {
    startColor = green;
    midColor = yellow;
    endColor = red;
  } else {
    startColor = red;
    midColor = yellow;
    endColor = green;
  }

  let gradientColor: string;

  if (rate100 <= 50) {
    // Interpolate between startColor and midColor
    const t = rate100 / 50;
    const [r, g, b] = interpolateColors(startColor, midColor, t);
    gradientColor = `rgba(${r}, ${g}, ${b}, 1)`;
  } else {
    // Interpolate between midColor and endColor
    const t = (rate100 - 50) / 50;
    const [r, g, b] = interpolateColors(midColor, endColor, t);
    gradientColor = `rgba(${r}, ${g}, ${b}, 1)`;
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
