import { create } from "zustand";

type User = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type State = {
  user: User | Record<string, never>;
};
type Actions = {
  setUser: (data: User) => void;
};

export const useUserStore = create<State & Actions>((set) => ({
  user: {},
  setUser: (data: User) => set(() => ({ user: data })),
  signOutUser: () => set({ user: {} }),
}));
