import { Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AuthRoutes = () => {
  const { user } = useAppContext();
  return !user ? <Outlet /> : <Navigate to={"/profile"} />;
};

export default AuthRoutes;
