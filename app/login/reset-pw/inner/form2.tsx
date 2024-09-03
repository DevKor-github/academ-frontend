import { HStack } from '@/components/basic/stack';

import Input from '@/components/basic/input';
import Button from '@/components/basic/button';
import Spinner from '@/components/basic/spinner';
import { handleInputBuilder } from '@/lib/form/handler';


export default function ResetPwForm2({ input, handleInput, handleSubmit, submitting }: FormProps<ResetPwReq>) {

  return (<form
    method="post"
    onSubmit={handleSubmit}
  >
    <HStack gap="48px">
      <HStack gap="16px">
        <Input
          disabled
          required
          id="email"
          placeholder="이메일을 입력해주세요"
          onChange={handleInput}
          value={input.email}
          style={{ padding: '16px' }}
        />

        <Input
          required
          id="code"
          placeholder="인증번호를 입력해주세요"
          autoComplete='one-time-code'
          onChange={handleInput}
          value={input.code}
          style={{ padding: '16px' }}
        />

      </HStack>
      <HStack style={{}} gap="20px">
        <Button
          type="submit"
          kind="filled"
          disabled={submitting || input.email === ''}
          accnet="0"
          variant="contained"
          color="primary"
          style={{ padding: '16px', width: '100%' }}
        >
          <div>{submitting ? <span><Spinner /> 전송 중...</span> : "비밀번호 초기화"}</div>
        </Button>
      </HStack>
    </HStack>
  </form>);
}