import { z } from "zod";
import { credentialsSchema } from "./session";

export const userSchema = credentialsSchema.extend({
  _id: z.string(),
  sub: z.string(),
});

export type User = z.infer<typeof userSchema>;
