import { CircleAlertIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function ErrorLabel({
  className = '',
  label,
  shake,
}: {
  className?: string;
  label: string;
  shake?: boolean;
}) {
  return label ? (
    <em
      role="alert"
      className={twMerge(
        'not-italic',
        label === '' ? ' hidden ' : '',
        shake ? ' animate-shake ' : '',
        `inline-block flex-row items-start gap-1 text-red-600`,
        className,
      )}
    >
      <CircleAlertIcon /> {label}
    </em>
  ) : null;
}
