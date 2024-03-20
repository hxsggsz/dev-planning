export type Variants = "info" | "success" | "warning" | "error";
export interface ToastProps {
  variant: Variants;
  content: string;
  onClose: () => void;
  icon: React.ElementType;
}
