import './index.module.css';

import Typography from '../Typography';

interface InputProp extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
}
export default function Input({ label, ...rest }: InputProp) {
  return (
    <Typography variant="t5">
      <input placeholder={label} {...rest} />
    </Typography>
  );
}
