import React from 'react';
import styles from './skeleton.module.css';

export default function Skeleton({ placeholder }: { placeholder: React.ReactNode }) {
  return <span className={`${styles.skeleton}`}>{placeholder}</span>;
}

export function SkeletonDiv({ className = '', ...props }: React.HTMLProps<HTMLDivElement>) {
  return <div className={`${styles.skeleton} ${className}`} {...props} />;
}
