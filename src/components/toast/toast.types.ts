export interface ToastProps {
  variant: "info" | "success" | "warning" | "error";
  content: string;
  onClose: () => void;
  icon: React.ElementType;
}
