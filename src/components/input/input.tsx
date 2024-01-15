import scss from "./input.module.scss";
import { RootProps } from "./input.types";

export function Root(props: RootProps) {
  return <label className={scss.root} {...props} />;
}
