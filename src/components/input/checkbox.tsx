import { Field, Checkbox as HeadlessCheckbox, Label } from '@headlessui/react';
import { CheckIcon } from 'lucide-react';

interface Props {
  label?: string;
  value: boolean;
  setValue: SetState<boolean>;
}

export default function Checkbox({ label, value: enabled, setValue: setEnabled }: Props) {
  return (
    <Field className="flex items-center gap-2 hover:opacity-90 active:opacity-50 cursor-pointer transition duration-75">
      <HeadlessCheckbox
        checked={enabled}
        onChange={setEnabled}
        className="group flex flex-row items-center justify-center size-5 rounded border bg-white transition duration-75 data-[checked]:bg-primary-500 text-center"
      >
        <CheckIcon className="block text-white" strokeWidth={4} size={12} />
      </HeadlessCheckbox>
      <Label>{label}</Label>
    </Field>
  );
}
