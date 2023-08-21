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

import useAuth from "../../hooks/useAuth";

import useUserStore from "../../zustand/useUserStore";

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
    <aside className="w-1/5 font-semibold bg-white text-slate-800 dark:bg-slate-950 dark:text-white">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          {/* Add your user profile image here */}
          <div className="rounded-full bg-gray-700 text-white w-10 h-10 flex items-center justify-center">
            <span className="text-lg">A</span>
          </div>
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
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
              Dashboard
            </button>
          </li>
          {/* Users section */}
          <li>
            <div className="border-t border-gray-300 mb-4"></div>
            <button
              className={`w-full py-2 flex items-center ${
                selectedMenuItem === "Users"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
              onClick={() => setSelectedMenuItem("Users")}
            >
              <FiUsers className="mr-2" />
              Users
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
              Categories
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
              Courses
            </button>
          </li>
          <li>
            <div className="border-t border-gray-300 mb-4"></div>
            {/* Link to the home page */}
            <Link
              to="/"
              className="w-full py-2 flex items-center hover:text-primary"
            >
              Home
            </Link>
          </li>
          <li>
            {/* Logout button */}
            <button
              onClick={handleLogOutUser}
              className="w-full py-2 flex items-center text-red-500 hover:text-red-600"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AsideDashboard;
