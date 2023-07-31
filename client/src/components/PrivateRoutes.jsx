import { Outlet, Navigate } from "react-router-dom";
import useUserStore from "../zustand/useUserStore";

const PrivateRoutes = () => {
  const { user } = useUserStore();
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
