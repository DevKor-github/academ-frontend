import { inputVariant } from '@/style/input';

type InputProp = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * @deprecated use tailwind variant instead
 */
export default function Input({ className, ...rest }: InputProp) {
  return <input className={inputVariant({ className })} {...rest} />;
}
