export type CreateRoomTypes = {
  room: string;
  username: string;
  isPublic: boolean;
};

export type CreateUser = {
  roomId: string;
  username: string;
};
