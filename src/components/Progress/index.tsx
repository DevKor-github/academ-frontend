// import styles from './index.module.css';

interface ProgressProps {
  rate: number;
}

export default function Progress({ rate }: ProgressProps) {
  const rate100 = Math.min(1, Math.max(0, rate)) * 100;

  return (
    <div style={{ width: '100%', backgroundColor: '#dbdbdb' }}>
      <div style={{ width: `${rate100}%`, backgroundColor: '#a51330', height: '4px' }} />
    </div>
  );
}
