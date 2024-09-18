type InputHandler = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement extends infer E ? E : HTMLInputElement | HTMLTextAreaElement
  >,
) => void;
