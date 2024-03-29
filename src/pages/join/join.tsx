import JoinRoom from "./components/joinRoom/joinRoom";
import scss from "./join.module.scss";

function Join() {
  return (
    <main className={scss.wrapper}>
      <JoinRoom />
    </main>
  );
}

export default Join;
