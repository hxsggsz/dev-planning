import { joinRoom } from "@/services/channels/user";
import { useEffect } from "react";

function Room() {
  useEffect(() => {
    joinRoom
      .on("broadcast", { event: "JOIN_ROOM" }, (payload) =>
        console.log(payload),
      )
      .subscribe();

    return () => {
      joinRoom.unsubscribe();
    };
  }, []);
  return (
    <main>
      <h1>teste</h1>
    </main>
  );
}

export default Room;
