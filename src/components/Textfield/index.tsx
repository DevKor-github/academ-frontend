import styles from './index.module.css';

interface TextfieldProps {
  id: string;
  type?: 'text' | 'password';
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
  subMessage?: string;
}

export default function Textfield({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  isError = false,
  errorMessage,
  subMessage,
}: TextfieldProps) {
  return (
    <div className={styles['text-field-container']}>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${styles['text-field-input']} ${isError && type === 'password' ? styles.invalid : ''}`}
      />
      {isError === true && errorMessage && <div className={styles['error-message']}>{errorMessage}</div>}
      {subMessage && <div className={styles['error-message']}>{subMessage}</div>}
    </div>
  );
}
