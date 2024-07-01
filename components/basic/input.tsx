interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {
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
      <input
        className="p-3 accent-primary-500 focus:border-primary-500 transition-all w-full rounded-lg light:bg-white border light:border-light-back-2 dark:bg-neutral-900 dark:border-dark-back-2"
        placeholder={label}
        {...rest}
      />
    </span>
  );
}
