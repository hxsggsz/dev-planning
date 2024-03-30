import { useMemo } from "react";
import scss from "./profileLetter.module.scss";
import { ProfileLetterProps } from "./profileLetter.type";

function ProfileLetter(props: ProfileLetterProps) {
  const userInitialLetter = useMemo(() => {
    return props.name.split("").at(0)?.toUpperCase();
  }, [props.name]);

  return <div className={scss.image}>{userInitialLetter}</div>;
}

export default ProfileLetter;
