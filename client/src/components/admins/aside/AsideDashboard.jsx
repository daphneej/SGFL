import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {
  FiUsers,
  FiLayers,
  FiBook,
  FiBarChart,
  FiLogOut,
  FiHome,
} from "react-icons/fi";

import useAuth from "@/hooks/users/useAuth";

import useUserStore from "@/zustand/useUserStore";

import MenuItem from "@/components/admins/aside/MenuItem";

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
    <aside className="w-full py-8 font-semibold md:h-screen h-fit md:overflow-y-auto sm:w-72 bg-base-300">
      <div className="p-4">
        <div className="flex items-center mb-6 space-x-2">
          {/* Add your user profile image here */}
          <div className="flex items-center justify-center w-10 h-10 text-white bg-gray-700 rounded-full">
            <span className="text-lg">{`${user?.email
              .toUpperCase()
              .at(0)}`}</span>
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.role}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <ul className="">
          <MenuItem
            label={"Tableau de bord"}
            icon={<FiBarChart className="mr-2" />}
            menuItem={"Dashboard"}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <MenuItem
            label={"Utilisateurs"}
            icon={<FiUsers className="mr-2" />}
            menuItem={"Users"}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <MenuItem
            label={"Catégories"}
            icon={<FiLayers className="mr-2" />}
            menuItem={"Categories"}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <MenuItem
            label={"Cours"}
            icon={<FiBook className="mr-2" />}
            menuItem={"Courses"}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <li>
            <Link
              to={"/"}
              className="flex items-center w-full py-2 mt-4 hover:text-primary"
            >
              <FiHome className="mr-2" />
              Home
            </Link>
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
