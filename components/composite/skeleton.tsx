export default function Skeleton({
  className = '',
  placeholder,
}: {
  className?: string;
  placeholder: React.ReactNode;
}) {
  return <span className={'inline-block animate-pulse text-transparent ' + className}>{placeholder}</span>;
}

export function SkeletonDiv({ className = '', ...props }: React.HTMLProps<HTMLDivElement>) {
  return <div className={'block animate-pulse text-transparent ' + className} {...props} />;
}
