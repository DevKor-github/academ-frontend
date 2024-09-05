interface RadioProps {
  id?: string;
  value?: boolean;
  label: string;
  onClick?: (event: never) => unknown;
  onChange?: (event: never) => unknown;
  [key: string]: unknown;
}

export default function Radio({ id, value, label, onClick, onChange }: RadioProps) {
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
        onChange={onChange}
        // {...restProps}
      >
        <input className="accent-primary-500" id={id} role="switch" type="checkbox" defaultChecked={value} />
        <label className="ml-1" htmlFor={id}>
          {label}
        </label>
      </span>
    </section>
  );
}
