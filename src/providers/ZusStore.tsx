import { create } from "zustand";

type State = {
  token: string;
};
type Actions = {
  setToken: (jwt: string) => void;
};

const useStore = create<State & Actions>((set) => ({
  token: "",
  setToken: (jwt: string) => set(() => ({ token: jwt })),
  removeToken: () => set({ token: "" }),
}));

export default useStore;
