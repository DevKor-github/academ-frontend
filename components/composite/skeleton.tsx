export default function Skeleton({
  className = '',
  placeholder,
}: {
  className?: string;
  placeholder: React.ReactNode;
}) {
  return <span className={'inline-block animate-pulse text-transparent bg-dynamic-16 rounded-lg ' + className}>{placeholder}</span>;
}

export function SkeletonDiv({ className = '', ...props }: React.HTMLProps<HTMLDivElement>) {
  return <div className={'block animate-pulse text-transparent bg-dynamic-16 rounded-lg ' + className} {...props} />;
}
