import { Slot } from "@radix-ui/react-slot";
import { Loading } from "../loading/loading";
import { ButtonProps } from "./button.types";
import scss from "./button.module.scss";
import classNames from "classnames";

function Button({ size = "medium", ...props }: ButtonProps) {
  const btnClasses = classNames(props.className, [scss.default], {
    [scss[size!]]: size,
    [scss.rounded]: props.rounded,
    [scss.primary]: !props.variant,
    [scss.fullscreen]: props.fullScreen,
    [scss[props.variant!]]: props.variant,
  });

  const renderContent = () => (
    <>
      {props.icon && props.icon}
      {props.children}
    </>
  );

  const Comp = props.asChild ? Slot : "button";
  return (
    <Comp className={btnClasses} {...props}>
      {props.isLoading ? <Loading /> : renderContent()}
    </Comp>
  );
}

export default Button;
