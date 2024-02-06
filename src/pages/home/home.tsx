import CreateRoom from "./components/createRoom/createRoom";
import scss from "./home.module.scss";
import { useCreateRoom } from "@/stores/useCreateRoom/useCreateRoom";

function Home() {
  // TODO: adicionar toast para erros
  const createRoom = useCreateRoom();

  return (
    <div className={scss.container}>
      <CreateRoom handleSubmit={createRoom.createRoom} />
    </div>
  );
}

export default Home;
