import { useNavigate } from 'react-router-dom';

import Typography from '../base/Typography';

import buttonStyles from './button.module.css';

interface TopnavBlankButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  pill?: boolean;
  selected?: boolean;
  [key: string]: unknown;
}
interface TopnavButtonProps {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  pill?: boolean;
  [key: string]: unknown;
}
export function TopnavBlankButton({
  selected,
  children,
  pill,
  onClick,
  className,
  ...restProps
}: TopnavBlankButtonProps) {
  return (
    <a className={`${className}`}>
      <span
        // tabIndex={0}
        className={`${buttonStyles.primary} ${buttonStyles.unselected} ${buttonStyles.shared}`}
        onClick={onClick}
        {...restProps}
      >
        <Typography variant="t5">{children}</Typography>
      </span>
    </a>
  );
}

export function TopnavButton({ onClick, selected, href, children, icon, pill, ...restProps }: TopnavButtonProps) {
  const navigate = useNavigate();

  return (
    <a
      href={href}
      onClick={
        onClick ||
        ((e) => {
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            navigate(href || '.');
          }
        })
      }
      {...restProps}
    >
      <span
        // tabIndex={0}
        className={`${buttonStyles.shared} ${pill ? buttonStyles.pill : buttonStyles.primary} ${
          selected ? buttonStyles.selected : buttonStyles.unselected
        }`}
        style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap', overflow: 'hidden' }}
      >
        {icon}
        <Typography variant="t5">{children}</Typography>
      </span>
    </a>
  );
}
