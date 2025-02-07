import { tv } from 'tailwind-variants';

export const inputVariant = tv({
  base: [
    'p-4',
    'accent-primary-500',
    'focus:border-primary-500',
    'transition-all',
    'rounded-lg',
    'light:bg-white',
    'border',
    'light:border-base-30',
    'dark:bg-base-3',
    'dark:border-base-2',
  ],
});
