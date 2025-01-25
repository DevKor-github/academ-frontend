/** @deprecated use tanstack form instead */
export const handleInputBuilder = <State>(input: State, setInput: SetState<State>): InputHandler =>
  function handleInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const newValue = ['checkbox' /* , 'radio' */].includes(event.target.type)
      ? (event.target as HTMLInputElement).checked
      : event.target.value;

    setInput({
      ...input,
      [event.target.name || event.target.id]: newValue,
    });
  };

/** @deprecated use tanstack form instead */
export const newHandleInputBuilder = <State>(
  setInput: SetState<State>,
  type: 'BOOLEAN' | 'STRING' | 'NUMBER',
): InputHandler =>
  function handleInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    switch (type) {
      case 'BOOLEAN':
        setInput((input) => ({
          ...input,
          [event.target.name]: (event.target as HTMLInputElement).checked,
        }));
        break;
      case 'STRING':
        setInput((input) => ({
          ...input,
          [event.target.name]: event.target.value,
        }));
        break;
      case 'NUMBER':
        setInput((input) => ({
          ...input,
          [event.target.name]: Number(event.target.value),
        }));
        break;
    }
  };
