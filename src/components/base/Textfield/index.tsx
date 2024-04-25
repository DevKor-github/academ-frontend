import styles from './index.module.css';

interface TextfieldProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  type?: 'text' | 'password';
  placeholder?: string;
  value: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
  subMessage?: string;
}

const Textfield: React.FC<TextfieldProps> = ({
  id,
  type,
  name,
  value,
  placeholder,
  onChange,
  onKeyDown,
  isError,
  errorMessage,
  subMessage,
}: TextfieldProps) => {
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
        className={`${styles['text-field-input']} ${isError && type === 'password' ? styles.invalid : ''}`}
      />
      {isError === true && errorMessage && <div className={styles['error-message']}>{errorMessage}</div>}
      {subMessage && <div className={styles['error-message']}>{subMessage}</div>}
    </div>
  );
};

export default Textfield;
