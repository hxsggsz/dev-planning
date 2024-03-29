import CreateRoom from "./components/createRoom/createRoom";
import scss from "./home.module.scss";

function Home() {
  return (
    <div className={scss.container}>
      <CreateRoom />
    </div>
  );
}

export default Home;
