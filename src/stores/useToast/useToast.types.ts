import { ToastProps } from "@/components/toast/toast.types";

export type ToastObject = Record<
  ToastProps["variant"],
  (content: string, wait?: number) => void
> & {
  onClose: () => void;
  toastContent: ToastProps;
};
