type VoidifyReturn<T> = T extends (...args: infer Args) => any ? (...args: Args) => void : never;
