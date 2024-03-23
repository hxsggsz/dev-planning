import classNames from "classnames";
import scss from "./input.module.scss";
import { InputErrorprops, InputProps, RootProps } from "./input.types";
import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Button from "../button/button";

function Root(props: RootProps) {
  const RootClasses = classNames(props.className, [scss.root], {
    [scss.error]: props.hasError,
  });
  return <label className={RootClasses} {...props} />;
}

function RealInput(props: InputProps) {
  const [isSecret, setIsSecret] = useState(true);

  const toggleSecret = () => setIsSecret((prev) => !prev);

  const renderSecretIcon = () => (
    <Button
      type="button"
      variant="none"
      onClick={toggleSecret}
      data-testid="toggle-button"
    >
      {isSecret ? (
        <Eye cursor="pointer" size={32} />
      ) : (
        <EyeSlash cursor="pointer" size={32} />
      )}
    </Button>
  );

  return (
    <>
      <input
        {...props}
        className={scss.input}
        type={isSecret ? "password" : "text"}
      />
      {props.isSecret && renderSecretIcon()}
    </>
  );
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
