import styles from './radio.module.css';

interface RadioProps {
  id?: string;
  value?: boolean;
  label: string;
  onClick: (event: never) => unknown;
  [key: string]: unknown;
}

function Circle() {
  return <svg width="20px" height="20px" viewBox="-40 -40 300 300" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" stroke="none" strokeWidth="5" fill="white" />
  </svg>;
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
        <input className="accent-primary-500" id={id} role="switch" type="checkbox" defaultChecked={value} />
        <label className='ml-1' htmlFor={id}>
          {label}
        </label>
      </span>
    </section>
  );
}
