export interface ToastProps {
  variant: "info" | "success" | "warning" | "error";
  content: string;
  icon: React.ElementType;
}
