import './index.module.css';

import Typography from '../base/Typography';

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
    <Typography variant="t5">
      <input style={{ width: '100%' }} placeholder={label} {...rest} />
    </Typography>
  );
}
