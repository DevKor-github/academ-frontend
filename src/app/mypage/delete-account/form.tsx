import Input from '@/components/basic/input';
import Button from '@/components/basic/button';
import Spinner from '@/components/basic/spinner';

export interface DeleteAccountInputExtended {
  password: string;
  checked: boolean;
}

export default function DeleteAccountForm(props: FormProps<DeleteAccountInputExtended>) {
  return (
    <form
      className="py-8 h-full transition-all self-center justify-center items-center pl-2 pr-2 flex flex-col gap-8 w-full md:w-1/2 *:w-full"
      method="post"
      onSubmit={props.handleSubmit}
    >
      <span className="text-2xl font-bold text-center">
        계정 삭제
        <br />
        <span className="text-lg">삭제하기 전에 다음 유의사항을 확인하세요.</span>
      </span>
      <div className="bg-primary-500 bg-opacity-5 p-8 rounded-xl my-8 border border-primary-500">
        <li>{'계정을 삭제하면 모든 포인트가 소멸되며, 복구할 수 없습니다.'}</li>
        <li>
          {
            '계정을 삭제한 뒤에도 일부 강의평은 즉시 삭제되지 않을 수 있으며, 더 이상 계정에 접근할 수 없으므로 강의평에 직접 접근할 수 없습니다.'
          }
        </li>
      </div>
      <div className="flex flex-col *:w-full gap-8">
        <Input
          id="password"
          type="password"
          placeholder="비밀번호 입력"
          onChange={props.handleInput}
          readOnly={props.handleInput === undefined}
        />
        <label htmlFor="checked">
          <input
            id="checked"
            type="checkbox"
            onChange={props.handleInput}
            className="accent-primary-500"
            readOnly={props.handleInput === undefined}
            checked={props.input.checked}
          />
          예, 계정을 삭제하면 삭제된 포인트를 다시 복구할 수 없으며 접근 권한을 잃어버림을 이해했습니다.
        </label>
        <Button
          disabled={
            props.handleInput === undefined || props.input.password === '' || !props.input.checked || props.submitting
          }
          type="submit"
        >
          {props.submitting ? <Spinner /> : '탈퇴하기'}
        </Button>
      </div>
    </form>
  );
}
