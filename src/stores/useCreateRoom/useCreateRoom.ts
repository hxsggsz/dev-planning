import { RoomService } from "@/services/roomService/roomService";
import { UserService } from "@/services/userService/userService";
import { CreateRoomTypes } from "@/types/createRoom";
import { create } from "zustand";

interface useCreateRoomTypes {
  status: "idle" | "error" | "success";
  error: ErrorTypes | null;
  createRoom: (
    inputs: CreateRoomTypes,
    onSuccess: (roomId: string) => void,
  ) => void;
}

interface ErrorTypes {
  title: string;
  description: string;
  code: number;
}

export const useCreateRoom = create<useCreateRoomTypes>()((set) => ({
  status: "idle",
  error: null,
  createRoom: async (inputs, onSuccess) => {
    const { data: dataRoom, error: errorRoom } = await RoomService.createRoom(
      inputs.room,
    );

    if (errorRoom) {
      set((state) => ({
        ...state,
        status: "error",
        error: {
          code: Number(errorRoom.code),
          title: errorRoom.message,
          description: errorRoom.details,
        },
      }));
      return;
    }

    const { data: dataUser, error: errorUser } = await UserService.createUser(
      inputs.username,
      dataRoom.id,
    );

    if (errorUser) {
      set((state) => ({
        ...state,
        error: {
          code: Number(errorUser.code),
          title: errorUser.message,
          description: errorUser.details,
        },
      }));
      return;
    }

    onSuccess(dataRoom.id);
    localStorage.setItem("@me", dataUser.id);

    set({ error: null, status: "success" });
  },
}));
