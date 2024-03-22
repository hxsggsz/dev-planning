export interface RootProps extends React.ComponentProps<"label"> {
  hasError?: boolean;
}

export interface InputProps extends React.ComponentProps<"input"> {
  isSecret?: boolean;
}

export interface InputErrorprops {
  errorMessage: string | undefined;
}
