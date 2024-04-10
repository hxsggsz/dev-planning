import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/auth/signIn/signIn";
import SignUp from "./pages/auth/signUp/signUp";
import Home from "./pages/home/home";
import Join from "./pages/join/join";
import Room from "./pages/room/room";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/auth/signin",
    element: <SignIn />,
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
