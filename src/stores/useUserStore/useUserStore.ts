import { UserService } from "@/services/userService/userService";
import { User } from "@/types/user";
import { create } from "zustand";

interface useUserTypes {
  user: User | null;
  updateUser: (roomId: string, onError: (data: string) => void) => void;
}

const getId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("@id");
  }
};

export const useUser = create<useUserTypes>()((set) => ({
  user: null,
  updateUser: async (roomId, onError) => {
    const myId = getId();

    if (!myId) {
      onError("User not found");
      return;
    }

    const { data: dataUser, error: errorUser } = await UserService.findUser(
      roomId,
      myId,
    );

    console.log(dataUser);
    if (errorUser || !dataUser) {
      set((state) => ({
        ...state,
        status: "error",
        error: errorUser.message || "user not found",
      }));

      onError(errorUser.message || "user not found");
      return;
    }

    set((state) => ({
      ...state,
      user: dataUser,
    }));
  },
}));
