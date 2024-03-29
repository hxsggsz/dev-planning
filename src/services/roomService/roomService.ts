import { CreateRoomTypes, CreateUser } from "@/types/createRoom";
import { supabase } from "@/services/client";

export class RoomService {
  static async createRoom(room: CreateRoomTypes) {
    const response = await supabase
      .from("room")
      .insert({
        name: room.room,
        isPublic: room.isPublic,
      })
      .select()
      .single();

    return response;
  }

  static async addUserToRoom(inputs: CreateUser) {
    const response = await supabase
      .from("room_user")
      .insert({
        room_id: inputs.roomId,
        username: inputs.username,
      })
      .select()
      .single();

    return response;
  }

  static async findUserInRoom(roomId: string, userId: string) {
    const response = await supabase
      .from("room_user")
      .select("*")
      .eq("room_id", roomId)
      .eq("auth_id", userId);

    return response;
  }

  static async getRoom(roomId: string) {
    const response = await supabase
      .from("room")
      .select("*")
      .eq("id", roomId)
      .single();

    return response;
  }
}
