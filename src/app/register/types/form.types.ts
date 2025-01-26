import { SignupRequest } from '@/types/user.types';

export interface SignupRequestForm extends SignupRequest {
  passwordCheck: string;
}

export function conform(request: SignupRequestForm): SignupRequest {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordCheck, ...rest } = request;
  return {
    ...rest,
  };
}
