import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Room from "./pages/room/room";
import Home from "./pages/home/home";
import "./styles/base.scss";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/room/:id",
      element: <Room />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
