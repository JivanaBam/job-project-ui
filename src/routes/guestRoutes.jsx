import Login from "../pages/Login";
import Register from "../pages/Register";

const guestRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default guestRoutes;
