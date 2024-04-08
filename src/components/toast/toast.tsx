import scss from "./toast.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { X } from "@phosphor-icons/react";
import Button from "../button/button";
import { useToast } from "@/stores/useToast/useToast";

function Toast() {
  const { toastContent, onClose } = useToast();

  const toastClasses = classNames([scss.wrapper], {
    [scss[toastContent.variant]]: toastContent.variant,
  });

  return (
    <AnimatePresence>
      {toastContent.content && (
        <motion.div
          data-testid="toast"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "tween" }}
          className={toastClasses}
        >
          <div className={scss.errorWrapper}>
            <toastContent.icon className={scss.icon} weight="bold" />
            <p>{toastContent.content}</p>
          </div>

          <Button onClick={onClose} variant="ghost" size="small">
            <X />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
