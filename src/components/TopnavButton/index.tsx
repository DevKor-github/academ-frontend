import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: string;
  pill?: boolean;
  selected?: boolean;
  [key: string]: unknown;
}

export default function TopnavButton({ selected, href, children, icon, pill, ...restProps }: ButtonProps) {
  const navigate = useNavigate();

  return (
    <a
      className={styles.red}
      href={href}
      onClick={(e) => {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          navigate(href);
        }
      }}
      {...restProps}
    >
      <div
        tabIndex={0}
        className={`${styles.shared} ${pill ? styles.pill : styles.primary} ${
          selected ? styles.selected : styles.unselected
        }`}
        {...restProps}
      >
        {icon && <img src={icon} style={{ aspectRatio: 1, height: '18pt', width: 'auto', marginRight: '5px' }} />}
        <span>{children}</span>
      </div>
    </a>
  );
}
