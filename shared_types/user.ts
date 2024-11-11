import { z } from 'zod';
import { credentialsSchema } from './session';

export const userSchema = credentialsSchema.extend({
  _id: z.string(),
  sub: z.string().optional(),
  username: z.string(),
  overallScore: z.number().int().nonnegative().default(0),
  graduated: z.boolean().default(false),
});

export type User = z.infer<typeof userSchema>;

export type SignupFormValues = Omit<User, '_id'> & {
  confirmPassword: string;
};
