import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import SignUp from "./pages/auth/signUp/signUp";
import Join from "./pages/join/join";
import Room from "./pages/room/room";
import "./styles/base.scss";

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
      path: "/room/:roomId",
      element: <Room />,
    },
    {
      path: "/room/:roomId/join",
      element: <Join />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
