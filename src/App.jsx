import React from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";
import ForgotPass from "./components/auth/forgotpass";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/products/Products";
import SigninForm from "./components/auth/signin";
import ForgotPassword from "./components/auth/forgotpass";
import SignupForm from "./components/auth/singup";
import ProtectedRoute from "./components/utils/protectedroute";
import Cart from "./components/cart/cart";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Navigate to="/signup" replace />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/login",
    element: <SigninForm />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
  },
]);
