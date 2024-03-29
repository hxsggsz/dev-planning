import { RoomService } from "@/services/roomService/roomService";
import { CreateRoomTypes, CreateUser } from "@/types/createRoom";
import { MutationTypes } from "@/types/mutation";
import { create } from "zustand";

export type createRoomMutationTypes = CreateRoomTypes &
  Omit<CreateUser, "roomId">;

interface useCreateRoomTypes {
  status: "idle" | "error" | "success";
  error: string | null;
  createRoom: MutationTypes<string, createRoomMutationTypes>;
}

export const useCreateRoom = create<useCreateRoomTypes>()((set) => ({
  status: "idle" as const,
  error: null,
  createRoom: (onSuccess, onError) => {
    return async (inputs) => {
      const { data: dataRoom, error: errorRoom } =
        await RoomService.createRoom(inputs);

      if (errorRoom) {
        set((state) => ({
          ...state,
          status: "error",
          error: errorRoom.message,
        }));
        onError(errorRoom.message);
        return;
      }

      const { data: dataUser, error: errorUser } =
        await RoomService.addUserToRoom({
          ...inputs,
          roomId: dataRoom.id,
        });

      if (errorUser) {
        set((state) => ({
          ...state,
          status: "error",
          error: errorUser.message,
        }));
        onError(errorUser.message);
        return;
      }

      onSuccess(dataRoom.id);

      localStorage.setItem("@id", dataUser.id);
      set({ error: null, status: "success" });
    };
  },
}));
