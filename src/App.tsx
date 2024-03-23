import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import Join from "./pages/join/join";
import Room from "./pages/room/room";
import "./styles/base.scss";
import SignUp from "./pages/auth/signup/signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth/signup",
      element: <SignUp />,
    },
    {
      path: "/room/:id",
      element: <Room />,
    },
    {
      path: "/room/:id/join",
      element: <Join />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
