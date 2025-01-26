import { tv } from 'tailwind-variants';

export const a = tv({
  base: [],
  variants: {
    style: {
      accent: ['text-primary-500', 'no-underline', 'hover:underline', 'transition-all'],
      monotone: ['text-inherit', 'transition-all', 'hover:brightness-125', 'hover:underline'],
      abstract: [],
    },
  },
});
