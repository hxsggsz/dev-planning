import { Variants } from "@/components/toast/toast.types";

export interface ToastProviderProps {
  exitTimer?: number;
  children: React.ReactNode;
}

export type ToastObject = Record<
  Variants,
  (content: string, wait?: number) => void
>;

export interface StateProps {
  toast: ToastObject;
}
