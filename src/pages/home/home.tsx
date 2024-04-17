import { useEffect } from "react";
import CreateRoom from "./components/createRoom/createRoom";
import scss from "./home.module.scss";
import { useUser } from "@/stores/useUser/useUser";

function Home() {
  const updateUser = useUser((state) => state.updateUser);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateUser(), []);

  return (
    <div className={scss.container}>
      <CreateRoom />
    </div>
  );
}

export default Home;
