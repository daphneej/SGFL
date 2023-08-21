import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { QueryClientProvider } from "react-query";

import { queryClient } from "./index";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CoursePage from "./pages/CoursePage";
import AdminDashboard from "./pages/AdminDashboard";

import PrivateRoutes from "./components/PrivateRoutes";
import AdminRoute from "./components/AdminRoute";

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/courses" element={<CoursePage />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>,
    <Route path="/" element={<AdminRoute />}>
      <Route path="/admin" element={<AdminDashboard />} />,
    </Route>,
  ])
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </QueryClientProvider>
  </React.StrictMode>
);
