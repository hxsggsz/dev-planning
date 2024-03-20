import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider } from "./context/toastContext/toastContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider exitTimer={1000}>
      <App />
    </ToastProvider>
  </React.StrictMode>,
);
