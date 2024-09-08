import WarningIcon from '@/icons/warning';

export default function ErrorLabel({
  className = '',
  label,
  shake,
}: {
  className?: string;
  label: string;
  shake?: boolean;
}) {
  return (
    <div
      className={`
      ${className}
      ${label === '' ? ' hidden ' : ''} 
      ${shake ? ' animate-shake ' : ''}
      inline-block flex-row items-center gap-1 text-red-600`}
    >
      <WarningIcon /> {label}
    </div>
  );
}
