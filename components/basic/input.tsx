import styles from './input.module.css';

interface InputProp extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  id: string;
  type?: 'password' | 'email' | 'text' | 'password';
  placeholder?: string;
  value?: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function Input({ label, ...rest }: InputProp) {
  return (
    <span>
      <input className={styles.input + " w-full"} placeholder={label} {...rest} />
    </span>
  );
}
