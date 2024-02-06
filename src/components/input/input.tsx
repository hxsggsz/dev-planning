import classNames from "classnames";
import scss from "./input.module.scss";
import { InputErrorprops, InputProps, RootProps } from "./input.types";

function Root(props: RootProps) {
  const RootClasses = classNames(props.className, [scss.root], {
    [scss.error]: props.hasError,
  });
  return <label className={RootClasses} {...props} />;
}

function RealInput(props: InputProps) {
  return <input className={scss.input} {...props} />;
}

function Error(props: InputErrorprops) {
  return (
    props.errorMessage && (
      <span data-testid="error" className={scss.errorMessage}>
        {props.errorMessage}
      </span>
    )
  );
}

export default {
  Root,
  Input: RealInput,
  Error,
};
