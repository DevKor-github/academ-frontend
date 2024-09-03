'use client';

import Button from './button';
import { useState } from 'react';

interface SelectOpts<T> {
  value: T;
  label: string;
}

export default function Select<T>({
  items,
  setValue,
  defaultLabel,
}: {
  items: SelectOpts<T>[];
  setValue: React.Dispatch<React.SetStateAction<T>>;
  defaultLabel: string;
}) {
  const [selected, setSelected] = useState<string>(defaultLabel);

  return (
    <div className="flex flex-row text-sm pb-4 gap-2">
      {items.map((v) => (
        <Button
          kind="outline"
          key={v.label}
          onClick={() => {
            setValue(v.value);
            setSelected(v.label);
          }}
          className={`!border !rounded-full px-4 ${
            selected === v.label
              ? '!text-primary-500 !bg-primary-500/10 !border-primary-500'
              : 'light:!text-light-fore-10 dark:!text-dark-fore-10 light:!bg-light-back-1 dark:!bg-dark-back-1 light:!border-light-back-4 dark:!border-dark-back-4'
          }`}
        >
          <span>{v.label}</span>
        </Button>
      ))}
    </div>
  );
}
