import { CreateUser } from "@/types/createRoom";
import { MutationTypes } from "@/types/mutation";

export interface useJoinRoomTypes {
  status: "idle" | "error" | "success";
  error: string | null;
  joinRoom: MutationTypes<string, CreateUser>;
}
