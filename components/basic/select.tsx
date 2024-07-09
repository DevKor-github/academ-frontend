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
    <div className="flex flex-row text-sm pb-2">
      {items.map((v) => (
        <Button
          kind="blank"
          key={v.label}
          onClick={() => {
            setValue(v.value);
            setSelected(v.label);
          }}
        >
          <span className={selected === v.label ? 'text-primary-500' : 'text-light-fore-10'}>{v.label}</span>
        </Button>
      ))}
    </div>
  );
}
