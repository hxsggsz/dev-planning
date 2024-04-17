import { SignInTypes } from "@/pages/auth/signIn/components/signInForm/signInForm.type";
import { AuthType } from "@/services/authService/authService.types";
import { User } from "@/types/user";

export interface useUserTypes {
  user: User | null;
  signUp: (signUpData: AuthType) => Promise<void>;
  signIn: (signInData: SignInTypes) => Promise<void>;
  updateUser: () => void;
}
