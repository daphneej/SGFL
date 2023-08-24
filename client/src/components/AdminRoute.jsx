import { Outlet, Navigate } from "react-router-dom";
import useUserStore from "@/zustand/useUserStore";

const PrivateRoutes = () => {
  const { user } = useUserStore();
  return user && user.role === "ADMIN" ? (
    <Outlet />
  ) : user ? (
    <Navigate to={"/"} />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoutes;
