import styles from './TextField.module.css';

interface TextFieldProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  type?: 'text' | 'password';
  placeholder?: string;
  value: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  subMessage?: string;
  isError?: boolean;
  required?: boolean;
}

const TextField = ({
  id,
  type,
  name,
  value,
  placeholder,
  onChange,
  onKeyDown,
  errorMessage,
  subMessage,
  isError,
  required,
  ...restProps
}: TextFieldProps) => {
  return (
    <div className={styles['text-field-container']}>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
        className={`${styles['text-field-input']} ${errorMessage && type === 'password' ? styles.invalid : ''}`}
        {...restProps}
      />
      {errorMessage && <div className={styles['error-message']}>{errorMessage}</div>}
      {subMessage && <div className={styles['error-message']}>{subMessage}</div>}
    </div>
  );
};

export default TextField;
