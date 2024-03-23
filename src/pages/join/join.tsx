import JoinRoom from "./components/joinRoom/joinRoom";
import { joinRoom } from "@/services/channels/user";

function Join() {
  return (
    <main>
      <JoinRoom
        handleSubmit={(inputs) => {
          joinRoom.send({
            type: "broadcast",
            event: "JOIN_ROOM",
            payload: { message: inputs.username },
          });
        }}
      />
    </main>
  );
}

export default Join;
