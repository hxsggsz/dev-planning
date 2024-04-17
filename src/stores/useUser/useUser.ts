import { AuthService } from "@/services/authService/authService";
import { create } from "zustand";
import { useToast } from "@/stores/useToast/useToast";
import { AxiosError } from "axios";
import { useUserTypes } from "./useUser.types";
import { router } from "@/routes";
import cookies from "js-cookie";
import { decodeJWT } from "@/utils/decodeJWT";

export const useUser = create<useUserTypes>()((set) => ({
  user: null,
  signIn: async (signInData) => {
    const toast = useToast.getState();

    try {
      const { data } = await AuthService.signIn(signInData);

      cookies.set("_auth", data.access_token, { expires: 30 });
      toast.success("Account created successfully, now sign in");

      const decodedUser = decodeJWT(data.access_token);
      set((state) => ({
        ...state,
        user: {
          sub: decodedUser.sub,
          username: decodedUser.username,
        },
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

  updateUser: () => {
    const authCookie = cookies.get("_auth");
    if (!authCookie) {
      router.navigate("/auth/signup");
      return;
    }

    const decodedUser = decodeJWT(authCookie);
    set((state) => ({
      ...state,
      user: {
        sub: decodedUser.sub,
        username: decodedUser.username,
      },
    }));
  },
}));
