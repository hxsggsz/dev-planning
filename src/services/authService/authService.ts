import { supabase } from "@/services/client";
import { AuthType } from "./authService.types";

export class AuthService {
  static async signUp(data: AuthType) {
    const response = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    return response;
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
