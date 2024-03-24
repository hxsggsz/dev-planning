import { MotionProps } from "framer-motion";

export type RootProps = MotionProps & {
  hasError?: boolean;
  children: React.ReactNode;
};

export interface InputProps extends React.ComponentProps<"input"> {
  isSecret?: boolean;
}

export interface InputErrorprops {
  errorMessage: string | undefined;
}
