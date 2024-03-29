import { supabase } from "../client";

export class UserService {
  static async findUser(userId: string) {
    const response = await supabase
      .from("room_user")
      .select("*")
      .eq("id", userId)
      .single();
    return response;
  }
}
