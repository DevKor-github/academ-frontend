import { twMerge } from 'tailwind-merge';
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function HStack({ className = '', children, ...rest }: React.PropsWithChildren<StackProps>) {
  return (
    <div className={twMerge('flex flex-col', className)} {...rest}>
      {children}
    </div>
  );
}

export function VStack({ className = '', children, ...rest }: React.PropsWithChildren<StackProps>) {
  return (
    <div className={twMerge('flex flex-row', className)} {...rest}>
      {children}
    </div>
  );
}
