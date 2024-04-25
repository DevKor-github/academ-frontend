import React from 'react';

import Typography from './Typography';
import styles from './Tag.module.css';

// import styles from './Tag.module.css';

interface TagProps {
  children: React.ReactNode;
  accent?: 'string';
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const Tag: React.FC<TagProps> = ({ accent, children, ...restProps }: TagProps) => {
  return (
    <div className={styles.tag} {...restProps}>
      <Typography variant="t6">{children}</Typography>
    </div>
  );
};

export default Tag;
