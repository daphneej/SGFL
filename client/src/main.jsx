import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "@/App.jsx";

import AdminRoute from "@/components/AdminRoute";
import PrivateRoutes from "@/components/PrivateRoutes";

import AdminDashboard from "@/components/admins/AdminDashboard";
import TrainerDashboard from "@/components/trainers/TrainerDashboard";
import StudentDashboard from "@/components/students/StudentDashboard";
import UserDashboard from "@/components/users/UserDashboard";

import HomePage from "@/components/home/HomePage";
import LoginPage from "@/components/users/auth/LoginPage";
import RegisterPage from "@/components/users/auth/RegisterPage";
import ProfilePage from "@/components/users/ProfilePage";
import CoursePage from "@/components/courses/CoursePage";

import { queryClient } from "@/index";

import "react-toastify/dist/ReactToastify.css";
import "@/index.css";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/courses" element={<CoursePage />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="dashboard/users" element={<UserDashboard />} />
      </Route>
    </Route>,
    <Route path="/" element={<PrivateRoutes />}>
      <Route path="dashboard/students" element={<StudentDashboard />} />
      <Route path="dashboard/trainers" element={<TrainerDashboard />} />,
    </Route>,
    <Route path="/" element={<AdminRoute />}>
      <Route path="dashboard/admins" element={<AdminDashboard />} />
    </Route>,
  ])
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <ToastContainer position="top-center" />
  </React.StrictMode>
);
