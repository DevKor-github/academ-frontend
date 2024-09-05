export const handleInputBuilder = <State>(input: State, setInput: SetState<State>): InputHandler =>
  function handleInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    
    const newValue = ['checkbox', 'radio'].includes(event.target.type) ? ((event.target as HTMLInputElement).checked) : event.target.value

    setInput({
      ...input,
      [event.target.id]: newValue
    });
  };
