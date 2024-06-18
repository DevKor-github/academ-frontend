import styles from './spinner.module.css';

//  border: 16px solid #f3f3f3;
//border-top: 16px solid #3498db;

export default function Spinner({scale} : {scale : string}) {
  return <div className={styles.spinner + " border-neutral-300 border-t-primary-400 border-8 border-t-8"} style={{width: scale, height: scale}} ></div>;
};