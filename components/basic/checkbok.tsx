import { CheckedIcon, UncheckedIcon } from '@/icons';

interface CheckboxProps {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  [key: string]: unknown;
}

export default function Checkbox({ checked, onChange, ...restProps }: CheckboxProps) {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} {...restProps} />
      {checked ? <CheckedIcon /> : <UncheckedIcon />}
    </label>
  );
}
