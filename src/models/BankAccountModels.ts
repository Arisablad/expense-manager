import { z } from "zod";

export const BankAccountSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  balance: z.coerce.number().min(0, {
    message: "Balance must be at least 0.",
  }),
});
