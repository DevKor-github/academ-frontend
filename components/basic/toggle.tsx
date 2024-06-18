import { CheckIcon } from '../../icons';

import './Toggle.module.css';

interface ToggleProps {
  id?: string;
  checked?: boolean;
  label?: string;
  onClick: (event: never) => unknown;
  [key: string]: unknown;
}

export default function Toggle({ id, checked: value, label, onClick }: ToggleProps) {
  return (
    <section>
      <span
        tabIndex={0}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--fore-0)',
          padding: '0px',
        }}
        onClick={onClick}
        // {...restProps}
      >
        <input id={id} role="switch" type="checkbox" checked={value} readOnly />
        <label htmlFor={id}>
          <span id={id}>
            <span id={id}>
              <CheckIcon width="20px" height="20px" />
            </span>
          </span>
          {label}
        </label>
      </span>
    </section>
  );
}
