import scss from "./switch.module.scss";
import { SwitchProps } from "./switch.types";

function Switch(props: SwitchProps) {
  return (
    <input
      {...props}
      role="switch"
      type="checkbox"
      className={scss.switch}
      aria-checked={props.checked}
      aria-label={`switch ${props.checked ? "on" : "off"}`}
    />
  );
}

export default Switch;
