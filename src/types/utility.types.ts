export interface Empty {}

export type VoidifyReturn<T> = T extends (...args: infer Args) => any ? (...args: Args) => void : never;

export type ReplaceValues<T, K> = {
  [P in keyof T]: K;
};
