import { AxiosError } from 'axios';

import { Success, Failure, Result } from '../util/result';

import { backend } from './backend';

export async function LogoutAPI(): Promise<Result<undefined, unknown>> {
  const ret = await backend
    .post('/logout')
    .then(() => new Success(undefined))
    .catch((error: AxiosError) => {
      if (error.response) {
        return Promise.reject(new Failure(undefined));
      }
      return Promise.reject(new Failure(undefined));
    });
  return ret;
}
