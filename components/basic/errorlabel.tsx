import WarningIcon from '@/icons/warning';

export default function ErrorLabel({ className = '', label }: { className?: string; label: string }) {
  return (
    <span
      className={`
  ${className} 
  ${label === '' ? ' hidden ' : ' animate-shake '} 
  inline flex-row items-center gap-1 text-red-600`}
    >
      <WarningIcon /> {label}
    </span>
  );
}
