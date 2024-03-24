import { AuthService } from "@/services/authService/authService";
import { UserService } from "@/services/userService/userService";
import { SignUpTypes } from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface useUserTypes {
  user: User | null;
  error: string | null;
  status: "idle" | "error" | "loading" | "success";
  signUp: (
    onSuccess: (data: User) => void,
    onError: (data: string) => void,
  ) => (inputs: SignUpTypes) => Promise<void>;
  updateProfilePic: (
    onSuccess: (data: User) => void,
    onError: (data: string) => void,
  ) => (pictureLink: FileList) => Promise<void>;
}

export const useUser = create<useUserTypes>()((set, get) => ({
  user: null,
  error: null,
  status: "idle" as const,
  signUp: (onSuccess, onError) => {
    set((state) => ({
      ...state,
      status: "loading",
    }));

    return async (inputs) => {
      const { error: signUpError } = await AuthService.signUp(inputs);

      if (signUpError) {
        set((state) => ({
          ...state,
          status: "error",
          error: signUpError.message,
        }));
        onError(signUpError.message);
        return;
      }

      const { data: userData, error: userError } =
        await UserService.updateUsername(inputs.username);

      if (userError) {
        set((state) => ({
          ...state,
          status: "error",
          error: userError.message,
        }));
        onError(userError.message);
        return;
      }

      onSuccess(userData.user!);
      set({ error: null, user: userData.user, status: "success" });
    };
  },
  updateProfilePic: (onSuccess, onError) => {
    set((state) => ({
      ...state,
      status: "loading",
    }));

    return async (fileToUpload) => {
      const fileName = `${get().user?.id}/${fileToUpload?.item(0)?.name.replace(/[^a-zA-Z0-9]/g, "")}-${new Date().toLocaleDateString().replace(/[^a-zA-Z0-9]/g, "-")}`;

      const { data: uploadData, error: uploadError } =
        await UserService.uploadFile(fileName, fileToUpload);

      if (uploadError) {
        set((state) => ({
          ...state,
          status: "error",
          error: uploadError.message,
        }));
        onError(uploadError.message);
        return;
      }

      const profilePic = import.meta.env.VITE_CDN_URL + uploadData.path;

      const { data: userData, error: userError } =
        await UserService.updateProfilePicture(profilePic);

      if (userError) {
        set((state) => ({
          ...state,
          status: "error",
          error: userError.message,
        }));
        onError(userError.message);
        return;
      }

      console.log({ userData });
      onSuccess(userData.user!);
      set({ error: null, user: userData.user, status: "success" });
    };
  },
}));
