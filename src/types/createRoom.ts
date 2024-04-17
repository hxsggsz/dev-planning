export type CreateRoomTypes = {
  room: string;
  isPublic: boolean;
};

export type CreateUser = {
  roomId: string;
  username: string;
};
