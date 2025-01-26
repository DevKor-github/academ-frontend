export type ReplaceValues<T, K> = {
  [P in keyof T]: K;
};
