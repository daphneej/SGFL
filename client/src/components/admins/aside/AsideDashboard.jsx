import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { FiUsers, FiBook, FiLogOut, FiHome, FiUser } from "react-icons/fi";

import { MdOutlineSpaceDashboard, MdOutlineCategory } from "react-icons/md";

import { RiMenuFoldLine } from "react-icons/ri";

import useAuth from "@/hooks/users/useAuth";

import useUserStore from "@/zustand/useUserStore";

import MenuItem from "@/components/admins/aside/MenuItem";

const AsideDashboard = ({
  selectedMenuItem,
  setSelectedMenuItem,
  menuOpen,
  setMenuOpen,
}) => {
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
    <aside
      className={`absolute ease-in-out duration-300 z-10 w-full py-8 overflow-hidden font-semibold h-screen md:overflow-y-auto sm:w-72 bg-base-300 ${
        !menuOpen && "-left-full"
      }`}
    >
      <div className="absolute mt-4 mr-4 top-1 right-1">
        <RiMenuFoldLine
          className="cursor-pointer"
          size={30}
          onClick={() => setMenuOpen(false)}
        />
      </div>
      <div className="px-4 mt-20 md:mt-10">
        <div className="flex items-center mb-6 space-x-2">
          {/* Add your user profile image here */}
          <div className="flex items-center justify-center w-10 h-10 text-white bg-gray-700 rounded-full">
            <span className="text-lg">{`${user?.email
              .toUpperCase()
              .at(0)}`}</span>
          </div>
          <div>
            <p className="text-sm font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <ul>
          <MenuItem
            label={"Dashboard"}
            icon={<MdOutlineSpaceDashboard className="mr-2" size={20} />}
            menuItem={"Dashboard"}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <MenuItem
            label={"Utilisateurs"}
            icon={<FiUsers className="mr-2" size={20} />}
            menuItem={"Users"}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <MenuItem
            label={"Catégories"}
            icon={<MdOutlineCategory className="mr-2" size={20} />}
            menuItem={"Categories"}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <MenuItem
            label={"Cours"}
            icon={<FiBook className="mr-2" size={20} />}
            menuItem={"Courses"}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />

          <div className="mt-4">
            <li>
              <p className="text-xl font-extrabold">Utilisateur</p>
            </li>

            <MenuItem
              label={"Home"}
              icon={<FiHome className="mr-2" size={20} />}
              link={"/"}
            />

            <MenuItem
              label={"Profile"}
              icon={<FiUser className="mr-2" size={20} />}
              link={"/profile"}
            />
          </div>

          <li>
            {/* Logout button */}
            <button
              onClick={handleLogOutUser}
              className="w-full mt-8 text-base text-red-500 normal-case btn btn-neutral"
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
