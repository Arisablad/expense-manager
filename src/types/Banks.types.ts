import { Expense } from "@/types/Expenses.types.ts";

export type Bank = {
  name: string;
  balance: number;
  owner: string;
  expenses: Expense[] | [];
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
};
