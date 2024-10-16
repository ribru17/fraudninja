import { z } from "zod";

export const credentialsSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  email: z.string().email("Invalid email format"),
});

export type Credentials = z.infer<typeof credentialsSchema>;
