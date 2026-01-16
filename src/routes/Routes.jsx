import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from '../Root/Root';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/Error/ErrorPage';
import MyProfile from '../pages/MyProfile';
import Service from '../pages/Service';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PrivateRoute from '../privateRoute/PrivateRoute';
import ServiceDetails from '../pages/CarDetails';
import ForgotPassword from '../pages/ForgotPassword';
import AddService from '../pages/AddService';
import MyServices from '../pages/MyServices';
import UpdateService from '../pages/UpdateService';
import MyOrders from '../pages/MyOrders';



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/services",
        element: <Service></Service>,
      },
      {
        path: "/services/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/add-services",
        element: (
          <PrivateRoute>
            {" "}
            <AddService></AddService>,
          </PrivateRoute>
        ),
      },
      {
        path: "/my-services",
        element: (
          <PrivateRoute>
            <MyServices></MyServices>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: <PrivateRoute>
          <MyOrders></MyOrders>
        </PrivateRoute>,
      },
      {
        path: "/update-services/:id",
        element: <UpdateService></UpdateService>,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);
