export {};

declare global {
  type StateChange<T> = React.Dispatch<React.SetStateAction<T>>;
}
