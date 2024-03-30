import ProfileLetter from "./components/profileLetter/profileLetter";
import scss from "./navbar.module.scss";

function Navbar() {
  return (
    <nav className={scss.wrapper}>
      <ul className={scss.userList}>
        <li className={scss.userWrapper}>
          <ProfileLetter name="hxsggsz" />

          <h3 className={scss.name}>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </h3>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
