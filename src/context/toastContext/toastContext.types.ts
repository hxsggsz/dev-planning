import { ToastProps } from "@/components/toast/toast.types";

export interface ToastProviderProps {
  exitTimer?: number;
  children: React.ReactNode;
}

export type ToastObject = Record<
  ToastProps["variant"],
  (content: string, wait?: number) => void
>;

export interface StateProps {
  toast: ToastObject;
}
