import { z } from 'zod';
import { scamCategory } from './scamCategory';

export const resourceSchema = z.object({
  _id: z.string(),
  category: scamCategory,
  content: z.string().max(500),
  links: z.array(z.string()),
  image: z.instanceof(Buffer).optional(),
});

export type Resource = z.infer<typeof resourceSchema>;
