interface ToggleProps {
  value: boolean;
  label: string;
  onClick: (event: never) => unknown;
  [key: string]: unknown;
}

export default function Toggle({ value, label, ...restProps }: ToggleProps) {
  return (
    <button
      tabIndex={0}
      style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'none', border: 'none' }}
      {...restProps}
    >
      <span
        style={{
          display: 'inline-block',
          minWidth: '18px',
          minHeight: '18px',
          aspectRatio: 1,
          background: value ? 'red' : 'none',
          border: 'solid 1px red',
          borderRadius: '50%',
          marginRight: '5px',
        }}
      />
      {label}
    </button>
  );
}
