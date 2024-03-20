import Toast from "@/components/toast/toast";
import { ToastProps } from "@/components/toast/toast.types";
import { toastReducer, initialState } from "@/reducer/toast";
import { createContext, useReducer } from "react";
import { Check, Info, Warning, XCircle } from "@phosphor-icons/react";
import {
  StateProps,
  ToastProviderProps,
  ToastObject,
} from "./toastContext.types";

export const ToastContext = createContext({} as StateProps);

export const ToastProvider = ({ children, exitTimer }: ToastProviderProps) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const toast: ToastObject = {
    warning: (content, wait) => {
      const warningToast: ToastProps = {
        content,
        icon: Warning,
        variant: "warning",
        onClose: () => dispatch({ type: "update_content" }),
      };

      dispatch({ type: "fill_toast", payload: warningToast });
      setTimeout(
        () => dispatch({ type: "update_content" }),
        wait ?? exitTimer ?? 3500,
      );
    },
    info: (content, wait) => {
      const warningToast: ToastProps = {
        content,
        icon: Info,
        variant: "info",
        onClose: () => dispatch({ type: "update_content" }),
      };

      dispatch({ type: "fill_toast", payload: warningToast });
      setTimeout(
        () => dispatch({ type: "update_content" }),
        wait ?? exitTimer ?? 3500,
      );
    },

    success: (content, wait) => {
      const warningToast: ToastProps = {
        content,
        icon: Check,
        variant: "success",
        onClose: () => dispatch({ type: "update_content" }),
      };

      dispatch({ type: "fill_toast", payload: warningToast });
      setTimeout(
        () => dispatch({ type: "update_content" }),
        wait ?? exitTimer ?? 3500,
      );
    },

    error: (content, wait) => {
      const warningToast: ToastProps = {
        content,
        icon: XCircle,
        variant: "error",
        onClose: () => dispatch({ type: "update_content" }),
      };

      dispatch({ type: "fill_toast", payload: warningToast });
      setTimeout(
        () => dispatch({ type: "update_content" }),
        wait ?? exitTimer ?? 3500,
      );
    },
  };
  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast {...state} />
      {children}
    </ToastContext.Provider>
  );
};
