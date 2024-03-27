import { CreateRoomTypes } from "@/types/createRoom";
import { supabase } from "@/services/client";

export class RoomService {
  static async createRoom(room: CreateRoomTypes, userId: string) {
    const response = await supabase
      .from("room")
      .insert({
        name: room.room,
        isPublic: room.isPublic,
        users_id: [userId],
      })
      .select()
      .single();

    return response;
  }
}
