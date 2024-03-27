import { RoomService } from "@/services/roomService/roomService";
import { CreateRoomTypes } from "@/types/createRoom";
import { MutationTypes } from "@/types/mutation";
import { create } from "zustand";

export type createRoomMutationTypes = CreateRoomTypes & { userId: string };

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
      const { data: dataRoom, error: errorRoom } = await RoomService.createRoom(
        { ...inputs },
        inputs.userId,
      );

      if (errorRoom) {
        set((state) => ({
          ...state,
          status: "error",
          error: errorRoom.message,
        }));
        onError(errorRoom.message);
        return;
      }
      onSuccess(dataRoom.id);

      set({ error: null, status: "success" });
    };
  },
}));
