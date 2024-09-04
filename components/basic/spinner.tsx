import styles from './spinner.module.css';

//  border: 16px solid #f3f3f3;
//border-top: 16px solid #3498db;

export default function Spinner() {
  return (<svg fill="none" height="1em" viewBox="-7 -7 14 14" width="1em" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
    <path className={styles["animate-5"]}  d="M 0 2.1 l 0 4" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" />
    <path className={styles["animate-1"]} d="M 0 -2.1 l 0 -4" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" />
    <path className={styles["animate-75"]} d="M 2.1 0 l 4 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path className={styles["animate-25"]}  d="M -2.1 0 l -4 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path className={styles["animate-125"]}  d="M -1.514 -1.514 l -2.828 -2.828" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path className={styles["animate-625"]}  d="M 1.514 1.514 l 2.828 2.828" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path className={styles["animate-375"]}  d="M -1.514 1.514 l -2.828 2.828" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" />
    <path className={styles["animate-875"]}  d="M 1.514 -1.514 l 2.828 -2.828" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" />
  </svg>);
}