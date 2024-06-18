import React from 'react';
import styles from './skeleton.module.css';

export default function Skeleton ({placeholder} : {placeholder : string}) {
  return <span className={`${styles.skeleton}`} >{placeholder}</span>;
}

