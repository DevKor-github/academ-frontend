import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { inputVariant } from '@/style/input';
import { useState } from 'react';
import { departments } from '@/data/departments';
import { filterByFuzzy } from '@/util/fuzzy.util';
import { useMemo } from 'react';
import { useCallback } from 'react';

interface Props {
  value: string;
  setValue: (next: string) => void;
}

export default function DepartmentInput<T extends { department: string }>({
  value,
  setValue,
}: Props) {
  const [query, setQuery] = useState('');
  
  const candidates = useMemo(() => {
    const arr = filterByFuzzy(
      departments,
      query,
      (department) => department,
    );
    console.assert(Array.isArray(arr));
    return arr;
  }, [query]);

  const handleChange = useCallback((value: string | null) => {
    setValue(value ?? '');
  }, [setValue]);

  return (
    <Combobox
      value={value}
      virtual={{ options: candidates }}
      onChange={handleChange}
      onClose={() => setQuery('')}
    >
      <ComboboxInput className={inputVariant({
        className: 'w-full',
      })}
        required
        type="text"
        id="department"
        placeholder="학과"
        autoComplete="off"
        // value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {
        candidates.length > 0 ?
        <ComboboxOptions
        anchor="bottom"
        className="w-[var(--input-width)] block m-0 p-2 light:bg-white border light:border-base-30 dark:bg-neutral-900 dark:border-base-2 rounded-lg z-10">
        {({ option: dropDownItem }) => (
          <ComboboxOption
          key={dropDownItem}
          className="p-2 cursor-pointer data-[focus]:light:bg-gray-300 data-[focus]:dark:bg-gray-700 w-full"
          value={dropDownItem}
          >
            {dropDownItem}
          </ComboboxOption>
        )}
          </ComboboxOptions>
          :
          <p className="p-2 text-gray-500">해당하는 단어가 없습니다</p>
      }
    </Combobox>
  );
}
