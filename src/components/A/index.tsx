import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';

interface AProps {
  abstract?: boolean;
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

export default function A({ abstract, href, children, ...restProps }: AProps) {
  const navigate = useNavigate();

  return (
    <a
      className={abstract ? '' : styles.red}
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
