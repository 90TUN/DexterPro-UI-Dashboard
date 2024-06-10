import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import User from "./components/User";
import Vendor from "./components/Vendor";
import Services from "./components/Services";
import Transactions from "./components/Transactions";
import Orders from "./components/Orders";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "user",
    element: <User />,
  },
  {
    path: "order",
    element: <Orders />,
  },
  {
    path: "vendor",
    element: <Vendor />,
  },
  {
    path: "service",
    element: <Services />,
  },
  {
    path: "transactions",
    element: <Transactions />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
