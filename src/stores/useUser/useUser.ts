import { AuthService } from "@/services/authService/authService";
import { UserService } from "@/services/userService/userService";
import { create } from "zustand";
import { useToast } from "@/stores/useToast/useToast";
import { AxiosError } from "axios";
import { useUserTypes } from "./useUser.types";

const getId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("@id");
  }
};

export const useUser = create<useUserTypes>()((set) => ({
  user: null,
  signUp: async (signUpData) => {
    try {
      await AuthService.signUp(signUpData);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        useToast.getState().error(error.response?.data.message);
      }
    }
  },
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
