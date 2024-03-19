import { Warning } from "@phosphor-icons/react";
import scss from "./toast.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { ToastProps } from "./toast.types";

function Toast(props: ToastProps) {
  return (
    <AnimatePresence>
      {props.shouldShow && (
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          exit={{ x: 1000 }}
          transition={{ type: "tween" }}
          className={scss.wrapper}
        >
          <div className={scss.errorInfo}>
            <Warning size={24} />
          </div>
          <div className={scss.content}>
            <h1>titulo</h1>
            <p>Lorem ipsum dolor sit amet,</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
