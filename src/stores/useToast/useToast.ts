import { Check, Info, Warning, XCircle } from "@phosphor-icons/react";
import { create } from "zustand";
import { DEFAULT_TOAST_TIMER } from "./useToast.constants";
import { ToastObject } from "./useToast.types";

export const useToast = create<ToastObject>()((set, get) => ({
  toastContent: {
    content: "",
    variant: "warning" as const,
    icon: Warning,
  },

  onClose: () => {
    set((state) => ({
      ...state,
      toastContent: {
        ...state.toastContent,
        content: "",
      },
    }));
  },

  info: (content, wait = DEFAULT_TOAST_TIMER) => {
    set({
      toastContent: {
        content,
        icon: Info,
        variant: "info",
      },
    });

    setTimeout(() => get().onClose(), wait);
  },

  warning: (content, wait = DEFAULT_TOAST_TIMER) => {
    set({
      toastContent: {
        content,
        icon: Warning,
        variant: "warning",
      },
    });

    setTimeout(() => get().onClose(), wait);
  },

  error: (content, wait = DEFAULT_TOAST_TIMER) => {
    set({
      toastContent: {
        content,
        icon: XCircle,
        variant: "error",
      },
    });

    setTimeout(() => get().onClose(), wait);
  },

  success: (content, wait = DEFAULT_TOAST_TIMER) => {
    set({
      toastContent: {
        content,
        icon: Check,
        variant: "success",
      },
    });

    setTimeout(() => get().onClose(), wait);
  },
}));
