import { CreateRoomTypes } from "@/types/createRoom";
import { supabase } from "../client";

export class UserService {
  static async createUser(
    username: CreateRoomTypes["username"],
    roomId: string,
  ) {
    const response = await supabase
      .from("user")
      .insert({ name: username, id: roomId, role: "ADMIN" })
      .select()
      .single();

    return response;
  }
}
