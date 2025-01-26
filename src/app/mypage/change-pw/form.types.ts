import type { UpdatePWRequest } from '@/types/user.types';

export interface UpdatePWForm extends UpdatePWRequest {
  new_password_check: string;
}

export function conform(data: UpdatePWForm): UpdatePWRequest {
  return {
    old_password: data.old_password,
    new_password: data.new_password,
  };
}
