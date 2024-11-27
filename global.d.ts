export {};
import { EnvKey } from '@/util/env';

declare global {
  type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

  type JWT = string;

  declare namespace NodeJS {
    interface ProcessEnv extends Record<EnvKey, string> {}
  }
}
