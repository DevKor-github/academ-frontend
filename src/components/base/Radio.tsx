import './Radio.module.css';

interface RadioProps {
  id?: string;
  value?: boolean;
  label: string;
  onClick: (event: never) => unknown;
  [key: string]: unknown;
}

export default function Radio({ id, value, label, onClick }: RadioProps) {
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
        <input id={id} role="switch" type="checkbox" checked={value} />
        <label htmlFor={id}>
          <span id={id}>
            <span id={id}>
              <svg width="20px" height="20px" viewBox="-20 -20 260 260" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" stroke="none" stroke-width="5" fill="white" />
              </svg>
            </span>
          </span>
          {label}
        </label>
      </span>
    </section>
  );
}
