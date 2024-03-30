import { useUser } from "@/stores/useUserStore/useUserStore";
import scss from "./header.module.scss";
import ProfileLetter from "../navbar/components/profileLetter/profileLetter";

function Header() {
  const user = useUser((state) => state.user);
  return (
    <header className={scss.header}>
      <div className={scss.userInfo}>
        <h2 className={scss.userName}>{user?.username}</h2>
        <ProfileLetter name={user?.username ?? ""} />
      </div>
    </header>
  );
}

export default Header;
