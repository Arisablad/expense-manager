import { createBrowserRouter } from "react-router-dom";
import Register from "@/pages/Register.tsx";
import ErrorBoundary from "@/utils/ErrorBoundary.tsx";
import Login from "@/pages/Login.tsx";
import Layout from "@/components/containers/Layout.tsx";
import HomePage from "@/pages/HomePage.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
]);

export default routes;
