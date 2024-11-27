type VoidifyReturn<T> = T extends (...args: infer Args) => any ? (...args: Args) => void : never;

type ReplaceValues<T, K> = {
  [P in keyof T]: K;
};
