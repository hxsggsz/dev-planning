import { AuthType } from "@/services/authService/authService.types";

export interface SignUpFormProps {
  signUp: (signUpData: AuthType) => void;
}
