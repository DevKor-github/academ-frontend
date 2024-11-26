'use client';

import Button from '@/components/basic/button';
import ErrorLabel from '@/components/basic/errorlabel';
import Input from '@/components/basic/input';
import Spinner from '@/components/basic/spinner';
import { EyeCloseIcon, EyeIcon } from '@/components/icon';
import { useState } from 'react';

export default function ChangePWForm({
  handleSubmit,
  input,
  submitting,
  handleInput,
  error,
}: FormProps<UpdatePWExtended>) {
  const inputFields = [
    { label: '기존 비밀번호', name: 'oldPassword' },
    { label: '새 비밀번호', name: 'newPassword' },
    { label: '새 비밀번호 확인', name: 'newPasswordConfirm' },
  ];

  const [showPw, setShowPw] = useState<boolean[]>(inputFields.map(() => false));

  const onToggleShow = (index: number) => {
    setShowPw((prev) => {
      const newHide = [...prev];
      newHide[index] = !newHide[index];
      return newHide;
    });
  };

  return (
    <form
      className="py-8 h-full transition-all self-center justify-center items-start pl-2 pr-2 flex flex-col gap-4 w-11/12 md:w-1/2"
      method="post"
      onSubmit={handleSubmit}
    >
      <span className="pl-8 pr-8 font-bold text-2xl self-center">비밀번호 수정</span>

      <span className="text-xl mx-2 mt-4">기존 비밀번호</span>

      <div className="relative w-full">
        <Input
          required
          id="old_password"
          type={showPw[0] ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="기존 비밀번호"
          value={input.old_password}
          className="bg-base-32 dark:bg-base-2 p-4 rounded-2xl w-full"
          onChange={handleInput}
          maxLength={24}
        />
        <div className="absolute top-4 right-4">
          {showPw[0] ? (
            <div onClick={() => onToggleShow(0)}>
              <EyeIcon />
            </div>
          ) : (
            <div onClick={() => onToggleShow(0)}>
              <EyeCloseIcon />
            </div>
          )}
        </div>
      </div>

      <ErrorLabel
        label={error ? '영문자, 숫자, 또는 특수문자로 이루어진 8 - 24 자리의 비밀번호를 입력해주세요.' : ''}
      />

      <span className="text-xl mx-2 mt-4">새 비밀번호</span>
      <div className="relative w-full">
        <Input
          required
          id="new_password"
          autoComplete="new-password"
          type={showPw[1] ? 'text' : 'password'}
          placeholder="새 비밀번호"
          value={input.new_password}
          className="bg-base-32 dark:bg-base-2-back-2 p-4 rounded-2xl w-full"
          onChange={handleInput}
          maxLength={24}
        />
        <div className="absolute top-4 right-4">
          {showPw[1] ? (
            <div onClick={() => onToggleShow(1)}>
              <EyeIcon />
            </div>
          ) : (
            <div onClick={() => onToggleShow(1)}>
              <EyeCloseIcon />
            </div>
          )}
        </div>
      </div>

      <span className="text-xl mx-2 mt-4">새 비밀번호 확인</span>
      <div className="relative w-full">
        <Input
          required
          type={showPw[2] ? 'text' : 'password'}
          id="new_password_check"
          autoComplete="new-password"
          placeholder="새 비밀번호 확인"
          value={input.new_password_check}
          className="bg-base-32 dark:bg-base-2 p-4 rounded-2xl w-full"
          onChange={handleInput}
          maxLength={24}
        />
        <div className="absolute top-4 right-4">
          {showPw[2] ? (
            <div onClick={() => onToggleShow(2)}>
              <EyeIcon />
            </div>
          ) : (
            <div onClick={() => onToggleShow(2)}>
              <EyeCloseIcon />
            </div>
          )}
        </div>
      </div>

      <Button
        className="w-full mt-4"
        disabled={
          submitting || input.old_password === '' || input.new_password === '' || input.new_password_check === ''
        }
        kind="filled"
        type="submit"
      >
        {submitting ? <Spinner /> : '비밀번호 변경'}
      </Button>
    </form>
  );
}
