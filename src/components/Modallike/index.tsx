import styles from './index.module.css';

interface ModallikeProps {
  children: React.ReactNode;
}

export default function Modallike({ children }: ModallikeProps) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
}
