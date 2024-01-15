export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
  rounded?: boolean;
  isLoading?: boolean;
  fullScreen?: boolean;
  icon?: React.ReactElement;
  variant?: "default" | "outline" | "none";
  size?: "small" | "medium" | "large" | "none";
}
