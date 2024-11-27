import Link, { LinkProps } from 'next/link';

interface AProps extends React.PropsWithChildren<LinkProps> {
  kind?: 'abstract' | 'monotone' | 'accent';
}

export default function A({ kind = 'accent', ...restProps }: AProps) {
  return (
    <Link
      // eslint-disable-next-line no-nested-ternary
      className={
        kind === 'accent'
          ? 'text-primary-500 no-underline hover:underline transition-all'
          : kind === 'monotone'
            ? 'text-inherit transition-all hover:brightness-125 hover:underline'
            : ''
      }
      {...restProps}
    />
  );
}
