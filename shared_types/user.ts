import { z } from 'zod';
import { credentialsSchema } from './session';

export const userSchema = credentialsSchema.extend({
  _id: z.string(),
  sub: z.string().optional(),
  username: z.string(),
});

export type User = z.infer<typeof userSchema>;

export type SignupFormValues = Omit<User, '_id'> & {
  confirmPassword: string;
};
