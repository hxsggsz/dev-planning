import Button from "@/components/button/button";
import scss from "./joinUsers.module.scss";
import { useJoinRoom } from "@/stores/useJoinRoom/useJoinRoom";
import { UserPlus } from "@phosphor-icons/react";
import { useToast } from "@/context/toastContext/useToast";
import { useParams } from "react-router-dom";

function JoinUsers() {
  const { toast } = useToast();

  const { roomId } = useParams();

  const requestJoinList = useJoinRoom((state) => state.requestJoinList);

  const addUserToRoom = useJoinRoom((state) => state.addUserToRoom);
  const addUserToRoomMutation = addUserToRoom(
    () => toast.success("user added succesfully"),
    (errorMessage) => toast.error(errorMessage),
  );

  const renderRequestJoinList = () =>
    requestJoinList.map((user) => (
      <li key={user.id}>
        <Button
          onClick={() => addUserToRoomMutation({ user, roomId: roomId ?? "" })}
        >
          {user.user_metadata.username}
        </Button>
      </li>
    ));

  return (
    <div className={scss.wrapper}>
      <Button rounded>
        <UserPlus size={32} />
      </Button>
      <ul>{renderRequestJoinList()}</ul>
    </div>
  );
}

export default JoinUsers;
