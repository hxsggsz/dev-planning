import { api } from "@/lib/api";
import { SignInTypes } from "@/pages/auth/signIn/components/signInForm/signInForm.type";
import { supabase } from "@/services/client";
import { AuthType } from "./authService.types";

export class AuthService {
  static async signUp(signUpData: AuthType): Promise<void> {
    await api.post("/api/auth/signup", signUpData);
  }

  static async signIn(signInData: SignInTypes) {
    const response = await api.post<{ access_token: string }>(
      "/api/auth/signin",
      signInData,
    );
    return response;
  }

  static async signOut() {
    const response = await supabase.auth.signOut();
    return response;
  }
}
