import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, and one number.";

export const ConfSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3),
  password: z.string().min(8).regex(passwordRegex, passwordError),
});

export const ConfSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const getFieldError = (property, value, schema = ConfSchema) => {
  const res = schema.shape[property].safeParse(value);
  if (!res.success) return res.error.issues.map((i) => i.message).join(", ");
  return undefined;
};

export const getErrors = (error) => {
  const all = error.issues.reduce((all, issue) => {
    const path = issue.path.join(".");
    all[path] = issue.message;
    return all;
  }, {});
  return all;
};