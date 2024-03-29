import { User } from "@/types/user";
import { create } from "zustand";

interface useUserTypes {
  user: User | null;
  updateUser: (newUser: User) => void;
}

export const useUser = create<useUserTypes>()((set) => ({
  user: null,
  updateUser: (newUser) => {
    set((state) => ({
      ...state,
      user: newUser,
    }));
  },
}));
