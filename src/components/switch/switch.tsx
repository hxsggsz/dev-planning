import scss from "./switch.module.scss";
import { SwitchProps } from "./switch.types";

function Switch(props: SwitchProps) {
  const handleCheck = (ev: React.ChangeEvent<HTMLInputElement>) => {
    props.setChecked(ev.target.checked);
  };

  return (
    <input
      role="switch"
      type="checkbox"
      onChange={handleCheck}
      className={scss.switch}
      checked={props.checked}
      aria-checked={props.checked}
      aria-label={`switch ${props.checked ? "on" : "off"}`}
    />
  );
}

export default Switch;
