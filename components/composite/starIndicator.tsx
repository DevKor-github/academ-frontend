import styles from './starIndicator.module.css';

export default function Star5({ rate, px = 32 }: { rate: number; px: number }) {
  return (
    <>
      <svg width="0" height="0">
        <defs>
          <clipPath id="star-shape-5" clipPathUnits="objectBoundingBox">
            {/* 각 별의 포인트를 x 좌표를 조정하여 복제 */}
            <polygon points="0.10,0.22 0.12,0.49 0.19,0.49 0.14,0.685 0.16,0.92 0.10,0.76 0.04,0.92 0.06,0.685 0.01,0.49 0.08,0.49" />
            <polygon points="0.30,0.22 0.32,0.49 0.39,0.49 0.34,0.685 0.36,0.92 0.30,0.76 0.24,0.92 0.26,0.685 0.21,0.49 0.28,0.49" />
            <polygon points="0.50,0.22 0.52,0.49 0.59,0.49 0.54,0.685 0.56,0.92 0.50,0.76 0.44,0.92 0.46,0.685 0.41,0.49 0.48,0.49" />
            <polygon points="0.70,0.22 0.72,0.49 0.79,0.49 0.74,0.685 0.76,0.92 0.70,0.76 0.64,0.92 0.66,0.685 0.61,0.49 0.68,0.49" />
            <polygon points="0.90,0.22 0.92,0.49 0.99,0.49 0.94,0.685 0.96,0.92 0.90,0.76 0.84,0.92 0.86,0.685 0.81,0.49 0.88,0.49" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.starClipped5} style={{ width: 4 * px + 'px', height: px + 'px' }}>
        <div className=" bg-red-500" style={{ width: px * rate * 4 + 'px', height: px + 'px' }} />
      </div>
    </>
  );
}

export function Star1({ rate, px = 32 }: { rate: number; px: number }) {
  return (
    <>
      <svg width="0" height="0">
        <defs>
          <clipPath id="star-shape-1" clipPathUnits="objectBoundingBox">
            <polygon points="0.5,0.0  0.6,0.35  0.95,0.35  0.68,0.57  0.78,0.9  0.5,0.7  0.22,0.9  0.32,0.57  0.05,0.35  0.4,0.35" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.starClipped1} style={{ height: px + 'px', width: px + 'px' }}>
        <div className=" bg-red-500" style={{ width: px * rate + 'px', height: px + 'px' }} />
      </div>
    </>
  );
}
