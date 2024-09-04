export const handleInputBuilder = <State>(input: State, setInput: SetState<State>): InputHandler =>
  function handleInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  };
