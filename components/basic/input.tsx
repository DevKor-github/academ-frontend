import './input.module.css';

interface InputProp extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  // errorMessage?: string;
  // isError?: boolean;
  id: string;
  type?: 'password' | 'email' | 'text' | 'password';
  placeholder?: string;
  value?: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
  subMessage?: string;
  required?: boolean;
}

export default function Input({ label, ...rest }: InputProp) {
  return (
    <span>
      <input style={{ width: '100%' }} placeholder={label} {...rest} />
    </span>
  );
}
