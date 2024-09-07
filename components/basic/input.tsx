type InputProp = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...rest }: InputProp) {
  return (
    <span>
      <input
        className={
          'p-3 accent-primary-500 focus:border-primary-500 transition-all w-full rounded-lg light:bg-white border light:border-light-back-2 dark:bg-neutral-900 dark:border-dark-back-2 ' +
          className
        }
        {...rest}
      />
    </span>
  );
}
