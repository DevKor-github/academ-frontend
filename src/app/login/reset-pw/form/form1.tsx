import { HStack } from '@/components/basic/stack';

import Button from '@/components/basic/button';
import Input from '@/components/basic/input';
import Spinner from '@/components/basic/spinner';
import type { ReactFormExtendedApi } from '@tanstack/react-form';
import { useState } from 'react';
interface Props {
  form: ReactFormExtendedApi<ResetPwReq, undefined>;
  sendCode: (f: ReactFormExtendedApi<ResetPwReq, undefined>) => void;
}

export default function ResetPwForm1({ form, sendCode }: Props) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSubmitting(true);
        sendCode(form);
        setSubmitting(false);
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
        </HStack>

        <HStack className="gap-y-5">
          <Button
            type="submit"
            kind="filled"
            accnet="0"
            variant="contained"
            color="primary"
            style={{ padding: '16px', width: '100%' }}
          >
            <div>
              {submitting ? (
                <span>
                  <Spinner /> 전송 중...
                </span>
              ) : (
                '인증번호 전송'
              )}
            </div>
          </Button>
        </HStack>
      </HStack>
    </form>
  );
}
