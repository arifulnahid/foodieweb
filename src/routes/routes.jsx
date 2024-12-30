import { createBrowserRouter, Navigate } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Food from "../components/food/Food";
import Cart from "../components/cart/Cart";
import Order from "../components/order/Order";
import Profile from "../components/profile/Profile";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import FoodDetails from "../components/food/FoodDetails";
import PrivateRoute from "./PrivateRoute";
import Logout from "../components/auth/Logout";
import Activate from "../components/activate/Activate";

export const router = createBrowserRouter([
  {
    path: "",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <Food />,
      },
      {
        path: "food/:id",
        element: <FoodDetails />,
      },
      {
        path: "profile/:tab?",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "order",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "activate/:uid64/:token",
        element: <Activate />,
      },
    ],
  },
]);
