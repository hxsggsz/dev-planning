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
}
