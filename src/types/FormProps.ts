/** @deprecated use tanstack form instead */
interface FormProps<T> {
  input: T;
  handleInput?: InputHandler;
  handleSubmit?: (e: React.FormEvent) => void;
  setInput?: React.Dispatch<React.SetStateAction<T>>;
  submitting: boolean;
  error?: boolean;
}
