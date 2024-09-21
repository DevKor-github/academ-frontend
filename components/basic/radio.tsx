interface RadioProps {
  id?: string;
  value: boolean;
  label: string;
  onChange?: React.ChangeEventHandler;
  readOnly: boolean;
}

export default function Radio({ readOnly, id, value, label, onChange }: RadioProps) {
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
      >
        <input
          readOnly={readOnly}
          className="accent-primary-500"
          id={id}
          role="switch"
          type="checkbox"
          onChange={onChange}
          checked={value}
        />
        <label className="ml-1" htmlFor={id}>
          {label}
        </label>
      </span>
    </section>
  );
}
