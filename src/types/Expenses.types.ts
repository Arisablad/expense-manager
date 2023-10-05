export type Expense = {
  _id: string;
  name: string;
  amount: number;
  category: string;
  account: string;
  owner: string;
  createdAt?: string;
  updatedAt?: string;
};
