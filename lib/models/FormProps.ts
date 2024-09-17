/**
 * Form Component를 위한 Prop입니다.
 */
interface FormProps<T> {
  input: T;
  handleInput?: InputHandler;
  handleSubmit?: (e: React.FormEvent) => void;
  submitting: boolean;
}
