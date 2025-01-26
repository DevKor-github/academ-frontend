'use client';

import { useState } from 'react';
import Input from '../basic/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface Props {
  value: string;
  setValue: SetState<string>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  divProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function PWInput({ value, setValue, inputProps = {}, divProps = {} }: Props) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="relative w-full" {...divProps}>
      <Input
        required
        type={show ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="기존 비밀번호"
        className="w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={24}
        {...inputProps}
      />
      <div className="absolute top-4 right-4 text-neutral-500 active:scale-90 transition-all cursor-pointer hover:text-neutral-800">
        {show ? (
          <div onClick={() => setShow(false)}>
            <EyeIcon />
          </div>
        ) : (
          <div onClick={() => setShow(true)}>
            <EyeOffIcon />
          </div>
        )}
      </div>
    </div>
  );
}
