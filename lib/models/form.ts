type InputHandler = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement extends infer E ? E : HTMLInputElement | HTMLTextAreaElement
  >,
) => void;

interface FormProps<T> {
  input: T;
  handleInput?: InputHandler;
  // setInput?: SetState<T>;
  handleSubmit?: (e: React.FormEvent) => void;
  submitting: boolean;
}

interface SelectOpts<T> {
  value: T;
  label: string;
}