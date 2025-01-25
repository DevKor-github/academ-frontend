import z from 'zod';

export const UpdatePWRequestSchema = z.object({
  old_password: z.string(),
  new_password: z.string(),
});

export type UpdatePWRequest = z.infer<typeof UpdatePWRequestSchema>;
