import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import PrivateRoute from "./PrivateRoute";
import Message from "../pages/message";
import Conversation from "../pages/message/[id]";
import PageRender from "../customRouter/PageRender";
import MainLayout from "../layout/MainLayout";
import Market from "../pages/market";
import Product from "../pages/market/[id]";
import Friend from "../pages/friends";
import Shop from "../pages/shop";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomeLayout></HomeLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/message",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Message />,
      },
      {
        path: ":id",
        element: <Conversation />,
      },
    ],
  },
  {
    path: "/market",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Market />,
      },
      {
        path: ":id",
        element: <Product />,
      },
    ],
  },
  {
    path: "/shop",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Shop />,
      },
      {
        path: ":id",
        element: <Product />,
      },
    ],
  },
  {
    path: "/friends",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Friend />,
      },
      // {
      //   path: ":id",
      //   element: <Product />,
      // },
    ],
  },
  {
    path: "/:page",
    element: (
      <PrivateRoute>
        <HomeLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <PageRender />,
      },
    ],
  },
  {
    path: "/:page/:id",
    element: (
      <PrivateRoute>
        <HomeLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <PageRender />,
      },
    ],
  },
]);
