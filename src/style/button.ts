import { tv } from 'tailwind-variants';

export const buttonBase = tv({
  base: ['flex', 'justify-center', 'items-center', 'rounded-lg', 'transition-all', 'p-2', 'whitespace-nowrap'],
  variants: {
    disabled: {
      true: 'bg-gray-300 cursor-not-allowed opacity-50',
      false: 'cursor-pointer',
    },
  },
});

export const filledButton = tv({
  extend: buttonBase,
  base: ['bg-primary-500', 'dark:bg-gray-700', 'text-white', 'dark:text-white'],
  variants: {
    disabled: {
      true: 'bg-gray-300 dark:bg-gray-700 border-none opacity-25',
      false: 'bg-primary-500 cursor-pointer border-none text-white dark:text-white',
    },
  },
});

export const outlineButton = tv({
  extend: buttonBase,
  base: ['border'],
  variants: {
    disabled: {
      true: 'border-gray-300 dark:border-gray-700 border opacity-25',
      false: 'border-primary-500 cursor-pointer',
    },
  },
});

export const blankButton = tv({
  extend: buttonBase,
  base: ['border-none'],
  variants: {
    disabled: {
      true: 'opacity-25',
      false: 'hover:opacity-50',
    },
  },
});
