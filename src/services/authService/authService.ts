import { supabase } from "@/services/client";
import { AuthType } from "./authService.types";
import { api } from "@/lib/api";

export class AuthService {
  static async signUp(signUpData: AuthType): Promise<void> {
    await api.post("/api/auth/signup", signUpData);
  }

  static async signIn(data: AuthType) {
    const response = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    return response;
  }

  static async signOut() {
    const response = await supabase.auth.signOut();
    return response;
  }
}
