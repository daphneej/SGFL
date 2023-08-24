import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {
  FiUsers,
  FiLayers,
  FiBook,
  FiBarChart,
  FiLogOut,
} from "react-icons/fi";

import useAuth from "@/hooks/users/useAuth";

import useUserStore from "@/zustand/useUserStore";

const AsideDashboard = ({ selectedMenuItem, setSelectedMenuItem }) => {
  const { user, setUser } = useUserStore();

  const { logoutUser } = useAuth();

  const { mutate } = useMutation("user", logoutUser, {
    onSuccess: (data) => {
      toast.success(data.message);
      setUser(data.user);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogOutUser = async () => {
    mutate(user);
  };

  return (
    <aside className="w-full py-8 font-semibold md:h-screen h-fit sm:w-72 bg-base-300">
      <div className="p-4">
        <div className="flex items-center mb-6 space-x-2">
          {/* Add your user profile image here */}
          <div className="flex items-center justify-center w-10 h-10 text-white bg-gray-700 rounded-full">
            <span className="text-lg">
              {`${user?.firstName.at(0)}${user?.lastName.at(0)}`}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.role}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <ul className="">
          {/* Dashboard section */}
          <li>
            <button
              className={`w-full py-2 flex items-center ${
                selectedMenuItem === "Dashboard"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
              onClick={() => setSelectedMenuItem("Dashboard")}
            >
              <FiBarChart className="mr-2" />
              Tableau de bord
            </button>
          </li>
          {/* Users section */}
          <li>
            <div className="border-t border-gray-300"></div>
            <button
              className={`w-full py-2 flex items-center ${
                selectedMenuItem === "Users"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
              onClick={() => setSelectedMenuItem("Users")}
            >
              <FiUsers className="mr-2" />
              Utilisateurs
            </button>
          </li>
          {/* Categories section */}
          <li>
            <div className="border-t border-gray-300"></div>
            <button
              className={`w-full py-2 flex items-center ${
                selectedMenuItem === "Categories"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
              onClick={() => setSelectedMenuItem("Categories")}
            >
              <FiLayers className="mr-2" />
              Catégories
            </button>
          </li>
          {/* Courses section */}
          <li>
            <div className="border-t border-gray-300"></div>
            <button
              className={`w-full py-2 flex items-center ${
                selectedMenuItem === "Courses"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
              onClick={() => setSelectedMenuItem("Courses")}
            >
              <FiBook className="mr-2" />
              Cours
            </button>
          </li>
          <li>
            <div className="mb-4 border-t border-gray-300"></div>
          </li>
          <li>
            {/* Logout button */}
            <button
              onClick={handleLogOutUser}
              className="w-full text-base text-red-500 normal-case btn btn-neutral"
            >
              <FiLogOut />
              Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AsideDashboard;
