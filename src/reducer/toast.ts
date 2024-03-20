import { ToastProps } from "@/components/toast/toast.types";

export const initialState: ToastProps = {
  onClose: () => {},
  content: "",
  icon: "symbol",
  variant: "warning",
};

type Action =
  | { type: "fill_toast"; payload: ToastProps }
  | { type: "update_content" };

export const toastReducer = (state: ToastProps, action: Action) => {
  switch (action.type) {
    case "fill_toast":
      return {
        ...state,
        onClose: action.payload.onClose,
        content: action.payload.content,
        icon: action.payload.icon,
        variant: action.payload.variant,
      };

    case "update_content":
      return {
        ...state,
        content: "",
      };
    default:
      return {
        ...state,
      };
  }
};
