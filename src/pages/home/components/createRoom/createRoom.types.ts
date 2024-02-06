import { CreateRoomTypes } from "@/types/createRoom";

export interface CreateRoomProps {
  handleSubmit: (
    inputs: CreateRoomTypes,
    onSucces: (roomId: string) => void,
  ) => void;
}
