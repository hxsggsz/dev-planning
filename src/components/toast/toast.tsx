import scss from "./toast.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { ToastProps } from "./toast.types";
import classNames from "classnames";
import { X } from "@phosphor-icons/react";
import Button from "../button/button";

function Toast({ icon: Icon, ...props }: ToastProps) {
  const toastClasses = classNames([scss.wrapper], {
    [scss[props.variant]]: props.variant,
  });

  return (
    <AnimatePresence>
      {props.content && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ x: 100 }}
          transition={{ type: "tween" }}
          className={toastClasses}
        >
          <div className={scss.errorWrapper}>
            <Icon className={scss.icon} weight="bold" />
            <p>{props.content}</p>
          </div>

          <Button onClick={props.onClose} variant="ghost" size="small">
            <X />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
