import { supabase } from "../client";

export class UserService {
  static async findUser(roomId: string, userId: string) {
    const response = await supabase
      .from("room_user")
      .select("*")
      .eq("id", userId)
      .eq("room_id", roomId)
      .single();
    return response;
  }
}
