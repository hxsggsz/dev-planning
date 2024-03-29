import { RoomService } from "@/services/roomService/roomService";
import { create } from "zustand";
import { useJoinRoomTypes } from "./useJoinRoom.type";

export const useJoinRoom = create<useJoinRoomTypes>()((set) => ({
  status: "idle" as const,
  error: null,
  joinRoom: (onSuccess, onError) => {
    return async (inputs) => {
      const { data, error } = await RoomService.getRoom(inputs.roomId);

      if (error || !data) {
        set((state) => ({
          ...state,
          status: "error",
          error: error.message || "room not found",
        }));
        onError(error.message || "room not found");
        return;
      }

      const isRoomPublic = data.isPublic;

      if (!isRoomPublic) {
        const errorMessage = "This room is not public :(";
        set((state) => ({
          ...state,
          status: "error",
          error: errorMessage,
        }));

        onError(errorMessage);
        return;
      }
      const { data: dataUser, error: errorUser } =
        await RoomService.addUserToRoom(inputs);

      if (errorUser) {
        set((state) => ({
          ...state,
          status: "error",
          error: errorUser.message,
        }));

        onError(errorUser.message);
        return;
      }

      localStorage.setItem("@id", dataUser.id);
      onSuccess(data.id);
    };
  },
}));
