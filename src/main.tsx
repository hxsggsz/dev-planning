import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Toast from "./components/toast/toast.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Toast />
    <App />
  </>,
);
