export {};
import { EnvKey } from '@/util/env';
import type {
  ApiResponse as _ApiResponse,
  ApiResponseSuccess as _ApiResponseSuccess,
  ApiResponseError as _ApiResponseError,
} from '@/types/dto/ApiResponse';
import type {
  Empty as _Empty,
  VoidifyReturn as _VoidifyReturn,
  ReplaceValues as _ReplaceValues,
} from '@/types/utility.types';

declare global {
  type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

  type JWT = string;

  type ApiResponse<T> = _ApiResponse<T>;
  type ApiResponseSuccess<T> = _ApiResponseSuccess<T>;
  type ApiResponseError = _ApiResponseError;

  type Empty = _Empty;
  type VoidifyReturn<T> = _VoidifyReturn<T>;
  type ReplaceValues<T, R> = _ReplaceValues<T, R>;
  declare namespace NodeJS {
    interface ProcessEnv extends Record<EnvKey, string> {}
  }
}
