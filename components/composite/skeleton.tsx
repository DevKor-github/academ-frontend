import React from 'react';
import styles from './skeleton.module.css';

export default function Skeleton ({width} : {width : string}) {
  return <span className={`${styles.skeleton}`} style={{ width }} />;
};

