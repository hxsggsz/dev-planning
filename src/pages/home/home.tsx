import { useEffect } from "react";
import CreateRoom from "./components/createRoom/createRoom";
import scss from "./home.module.scss";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/stores/useUserStore/useUserStore";

function Home() {
  const navigate = useNavigate();

  const updateUser = useUser((state) => state.updateUser);
  const updateUserMutation = updateUser(
    () => {},
    () => {
      navigate("/auth/signup");
    },
  );

  useEffect(() => {
    if (!localStorage.getItem("sb-dkmuumbgrlxcdmajkije-auth-token")) {
      navigate("/auth/signup");
    }
    updateUserMutation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={scss.container}>
      <CreateRoom />
    </div>
  );
}

export default Home;
