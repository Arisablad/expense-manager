import { create } from "zustand";
import { Expense } from "@/types/Expenses.types.ts";
import { Bank } from "@/types/Banks.types.ts";

type User = {
  name: string;
  username: string;
  email: string;
  password: string;
  bankAccounts: string[];
};

type State = {
  user: User | Record<string, never>;
  globalMostlyLikedCategories: [string, { count: number; total: number }][];
  globalExpenses: Expense[] | [];
  globalAccounts: Bank[] | [];
};
type Actions = {
  //User
  setUser: (data: User) => void;
  signOutUser: () => void;
  setGlobalMostlyLikedCategories: (
    data: [string, { count: number; total: number }][],
  ) => void;

  // EXPENSES
  setGlobalExpenses: (data: Expense[]) => void;
  addGlobalExpenses: (data: Expense[]) => void;

  // BANK ACCOUNTS
  setGlobalAccounts: (data: Bank[]) => void;
  addGlobalAccounts: (data: Bank) => void;
};

export const useUserStore = create<State & Actions>((set) => ({
  user: {},
  globalMostlyLikedCategories: [],
  globalExpenses: [],
  globalAccounts: [],
  setUser: (data: User) => set(() => ({ user: data })),
  signOutUser: () => set({ user: {} }),
  setGlobalMostlyLikedCategories: (
    data: [string, { count: number; total: number }][],
  ) => {
    set(() => ({ globalMostlyLikedCategories: data }));
  },
  setGlobalExpenses: (data: Expense[]) => {
    set(() => ({ globalExpenses: data }));
  },
  addGlobalExpenses: (data: Expense[]) => {
    set((state) => ({
      globalExpenses: [...state.globalExpenses, ...data],
    }));
  },
  setGlobalAccounts: (data: Bank[]) => {
    set(() => ({ globalAccounts: data }));
  },
  addGlobalAccounts: (data: Bank) => {
    set((state) => ({
      globalAccounts: [...state.globalAccounts, ...[data]],
    }));
  },
}));
