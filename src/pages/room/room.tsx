import { useUser } from "@/stores/useUser/useUser";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import scss from "./room.module.scss";
import Header from "./components/header/header";
import { useToast } from "@/stores/useToast/useToast";

function Room() {
  const { roomId } = useParams();

  const toast = useToast();

  const navigate = useNavigate();

  const updateUser = useUser((state) => state.updateUser);

  useEffect(() => {
    updateUser(roomId ?? "", (errorMessage) => {
      toast.error(errorMessage);
      navigate("join");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={scss.wrapper}>
      <Navbar />

      <section className={scss.screen}>
        <Header />
        <div className={scss.content}></div>
      </section>
    </main>
  );
}

export default Room;
