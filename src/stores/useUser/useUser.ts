import { AuthService } from "@/services/authService/authService";
import { UserService } from "@/services/userService/userService";
import { create } from "zustand";
import { useToast } from "@/stores/useToast/useToast";
import { AxiosError } from "axios";
import { useUserTypes } from "./useUser.types";
import { router } from "@/routes";
import cookies from "js-cookie";
import { decodeJWT } from "@/utils/decodeJWT";

const getId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("@id");
  }
};

export const useUser = create<useUserTypes>()((set) => ({
  user: null,
  signIn: async (signInData) => {
    const toast = useToast.getState();

    try {
      const { data } = await AuthService.signIn(signInData);

      cookies.set("_auth", data.access_token, { expires: 30 });
      toast.success("Account created successfully, now sign in");

      const decodedUser = decodeJWT(data.access_token);
      console.log(decodedUser);
      set((state) => ({
        ...state,
        user: decodedUser,
      }));
      router.navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error.response?.data.message);
      }
    }
  },
  signUp: async (signUpData) => {
    const toast = useToast.getState();

    try {
      await AuthService.signUp(signUpData);
      toast.success("Account created successfully, now sign in");
      router.navigate("/auth/signin");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error.response?.data.message);
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
