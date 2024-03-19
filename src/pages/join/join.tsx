import Toast from "@/components/toast/toast";
import JoinRoom from "./components/joinRoom/joinRoom";

function Join() {
  return (
    <main>
      <JoinRoom handleSubmit={() => {}} />
      <Toast shouldShow={false} />
    </main>
  );
}

export default Join;
