import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider } from "./context/toastContext/toastContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ToastProvider exitTimer={3500}>
    <App />
  </ToastProvider>,
);
