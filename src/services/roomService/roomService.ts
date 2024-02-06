import { CreateRoomTypes } from "@/types/createRoom";
import { supabase } from "../client";

export class RoomService {
  static async createRoom(room: CreateRoomTypes["room"]) {
    const response = await supabase
      .from("room")
      .insert({
        name: room,
      })
      .select()
      .single();

    return response;
  }
}
