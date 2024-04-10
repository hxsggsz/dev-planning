import { RouterProvider } from "react-router-dom";

import "./styles/base.scss";
import { router } from "@/routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
