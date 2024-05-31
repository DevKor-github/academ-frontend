import React from 'react';

import styles from './MainContainer.module.css';

export function MainContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.metacontainer}>{children}</div>;
}

export function MainContainerMargin({ children }: { children: React.ReactNode }) {
  return <div className={styles.metacontainerMargin}>{children}</div>;
}
