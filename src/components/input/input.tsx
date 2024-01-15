import classNames from "classnames";
import scss from "./input.module.scss";
import { InputProps, RootProps } from "./input.types";

function Root(props: RootProps) {
  const RootClasses = classNames(props.className, [scss.root], {
    [scss.error]: props.hasError,
  });
  return <label className={RootClasses} {...props} />;
}

function RealInput(props: InputProps) {
  return <input className={scss.input} {...props} />;
}

export default {
  Root,
  Input: RealInput,
};
