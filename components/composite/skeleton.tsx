import { twMerge } from "tailwind-merge";

export default function Skeleton({
  className = '',
  placeholder,
}: {
  className?: string;
  placeholder: React.ReactNode;
}) {
  return (
    <span className={twMerge('inline-block animate-pulse text-transparent bg-base-16 rounded-lg ', className)}>
      {placeholder}
    </span>
  );
}

export function SkeletonSlow({ className = '', placeholder }: { className?: string; placeholder: React.ReactNode }) {
  return (
    <span className={twMerge('inline-block animate-pulse-slow text-transparent bg-base-16 rounded-lg ',className)}>
      {placeholder}
    </span>
  );
}

export function SkeletonDiv({ className = '', ...props }: React.HTMLProps<HTMLDivElement>) {
  return <div className={twMerge('block animate-pulse text-transparent bg-base-16 rounded-lg ',className)} {...props} />;
}
