import { HStack } from '@/components/basic/stack';

import Input from '@/components/basic/input';
import Button from '@/components/basic/button';
import Spinner from '@/components/basic/spinner';
import type { ReactFormExtendedApi } from '@tanstack/react-form';
import type { ResetPwReq } from '@/types/user.types';

interface Props {
  form: ReactFormExtendedApi<ResetPwReq, undefined>;
}

export default function ResetPwForm2({ form }: Props) {
  return (
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <HStack className="gap-y-12">
        <HStack className="gap-y-4">
          <form.Field name="email">
            {(field) => (
              <Input
                required
                id="email"
                type="email"
                autoComplete="username"
                placeholder="이메일을 입력해주세요"
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                style={{ padding: '16px' }}
              />
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <Input
                required
                id="code"
                placeholder="인증번호를 입력해주세요"
                autoComplete="one-time-code"
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                style={{ padding: '16px' }}
              />
            )}
          </form.Field>
        </HStack>
        <HStack className="gap-y-5">
          <Button
            type="submit"
            kind="filled"
            disabled={form.state.isSubmitting}
            accnet="0"
            variant="contained"
            color="primary"
            style={{ padding: '16px', width: '100%' }}
          >
            <div>
              {form.state.isSubmitting ? (
                <span>
                  <Spinner /> 전송 중...
                </span>
              ) : (
                '비밀번호 초기화'
              )}
            </div>
          </Button>
        </HStack>
      </HStack>
    </form>
  );
}
