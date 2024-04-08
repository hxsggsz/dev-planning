import { useToast } from "@/stores/useToast/useToast";
import CreateRoom from "./components/createRoom/createRoom";
import scss from "./home.module.scss";
import Button from "@/components/button/button";

function Home() {
  const toast = useToast();

  return (
    <div className={scss.container}>
      <Button onClick={() => toast.success("test")}>teste</Button>
      <CreateRoom />
    </div>
  );
}

export default Home;
