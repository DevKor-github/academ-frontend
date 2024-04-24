import { useNavigate } from 'react-router-dom';

import styles from './A.module.css';

interface AProps {
  abstract?: boolean;
  style?: 'monotone' | 'accent';
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

export default function A({ style = 'accent', abstract, href, children, ...restProps }: AProps) {
  const navigate = useNavigate();

  return (
    <a
      // eslint-disable-next-line no-nested-ternary
      className={abstract ? '' : style === 'accent' ? styles.red : styles.monotone}
      href={href}
      onClick={(e) => {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          navigate(href);
        }
      }}
      {...restProps}
    >
      {children}
    </a>
  );
}
