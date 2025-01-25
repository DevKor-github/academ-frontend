'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/basic/button';
import Input from '@/components/basic/input';
import Spinner from '@/components/basic/spinner';
import DepartmentInput from '@/components/composite/departmentInput';
import Select from '@/components/basic/select';
import { MyPageUpdateBasic } from '@/app/api/mypage.api';
import { useForm } from '@tanstack/react-form';

interface Props {
  profile: UserProfile;
}

export default function UpdateBasicForm({ profile }: Props) {
  const router = useRouter();
  const form = useForm<UpdateProfileReq>({
    defaultValues: profile,
    onSubmit: async (value) => {
      await MyPageUpdateBasic(value.value).then((s) => {
        if (s.status === 'SUCCESS') {
          alert('프로필 수정을 완료했습니다.');
          router.push('/mypage?profilechanged');
        } else {
          alert(`프로필 수정을 실패했습니다: ${s.message}`);
        }
      });
    }
  });

  return (
    <form
      className="py-8 h-full transition-all self-center justify-center items-start pl-2 pr-2 flex flex-col gap-4 w-11/12 md:w-1/2"
      method="post"
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      <div className="w-full flex flex-row justify-center items-center">
        <span className="font-bold text-2xl">프로필 수정</span>

        <div className="flex flex-row justify-end gap-x-2 ml-auto *:border *:border-primary-400 *:rounded-full *:text-sm *:py-1 *:px-4 *:text-primary-400">
          <Link href="/mypage/change-pw">비밀번호 수정</Link>
          <Link href="/mypage/delete-account">계정 삭제</Link>
        </div>
      </div>

      <span className="text-xl mx-2 mt-4">닉네임</span>
      <form.Field name="username">
        {(field) => (
          <Input
            id="username"
            placeholder="닉네임"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            className="w-full"
          />
        )}
      </form.Field>
      
      <span className="text-xl mx-2 mt-4">학번</span>
      <form.Field name="student_id">
      {(field) => (
          <Input
            id="student_id"
            placeholder="학번"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            className="w-full"
          />
        )}

      </form.Field>
      <span className="text-xl mx-2 mt-4">학기</span>

      <form.Field name="semester"
      >
        {(field) => (
          <Input
            id="semester"
            placeholder="학기"
            value={String(field.state.value)}
            onChange={e => field.handleChange(Number(e.target.value))}
            className="w-full"
          />
        )}
      </form.Field>

      <span className="text-xl mx-2 mt-4">학과</span>
      <form.Field name="department">
      {(field) => (
          <DepartmentInput value={field.state.value} setValue={field.handleChange}  />
        )}
      </form.Field>
     
      <span className="text-xl mx-2 mt-4">학위 과정</span>

      <form.Field name="degree">
      {(field) => (
          <Select
            name="degree"
            value={field.state.value}
            handleValue={e => {
              field.handleChange(e.currentTarget.value as 'MASTER' | 'DOCTOR'); 
            }}
            items={[
              { value: 'MASTER', label: '석사' },
              { value: 'DOCTOR', label: '박사' },
            ]}
          />
        )}
      </form.Field>

      <Button className="w-full mt-4" kind="filled" type="submit">
        {form.state.isSubmitting ? (
          <span>
            <Spinner /> 처리 중...
          </span>
        ) : (
          '프로필 수정하기'
        )}
      </Button>
    </form>
  );
}
