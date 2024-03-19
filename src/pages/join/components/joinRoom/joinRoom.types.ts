import { CreateRoomTypes } from "@/types/createRoom";

export type JoinRoomTypes = Pick<CreateRoomTypes, "username">;

export interface JoinRoomProps {
  handleSubmit: (
    inputs: JoinRoomTypes,
    onSucces: (roomId: string) => void,
  ) => void;
}
