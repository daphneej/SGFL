import { Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const PrivateRoutes = () => {
  const { user } = useAppContext();
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
