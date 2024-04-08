import { AuthType } from "@/services/authService/authService.types";
import { User } from "@/types/user";

export interface useUserTypes {
  user: User | null;
  signUp: (signUpData: AuthType) => void;
  updateUser: (roomId: string, onError: (data: string) => void) => void;
}
