import { z } from "zod";

export const ExpenseSchema = z.object({
  name: z.string().min(3, {
    message: "Username must be at least 6 characters.",
  }),
  category: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  amount: z.coerce.number().min(0, {
    message: "Amount must be at least 0.",
  }),
  type: z.enum(["expense", "income"]),
  account: z.string().min(3, {
    message: "Account must be at least 4 characters.",
  }),
  owner: z
    .string()
    .min(3, {
      message: "Owner Account must be at least 4 characters.",
    })
    .optional(),
  _id: z
    .string()
    .min(3, {
      message: "Owner Id must be at least 4 characters.",
    })
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// _id: string;
// name: string;
// amount: number;
// category: string;
// account: string;
// owner: string;
// type: "expense" | "income";
// createdAt?: string;
// updatedAt?: string;
