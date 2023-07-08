import { z } from "zod";

const registerUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export { registerUserSchema, loginUserSchema };
