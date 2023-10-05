export type Expense = {
  _id: string;
  name: string;
  amount: number;
  category: string;
  account: string;
  owner: string;
  type: "expense" | "income";
  createdAt?: string;
  updatedAt?: string;
};
