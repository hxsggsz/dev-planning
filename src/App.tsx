import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Home from "./pages/home";
import "./styles/base.scss";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
