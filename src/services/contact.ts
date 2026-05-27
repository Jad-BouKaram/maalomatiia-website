import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10 characters or more)"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactErrors = Partial<Record<ContactField, string>>;

export function validateContact(input: ContactInput): ContactErrors | null {
  const result = contactSchema.safeParse(input);
  if (result.success) return null;

  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !(field in errors)) {
      errors[field as ContactField] = issue.message;
    }
  }
  return errors;
}
