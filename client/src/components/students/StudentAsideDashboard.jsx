import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { FiBook, FiLogOut, FiHome, FiUser } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiMenuFoldLine } from "react-icons/ri";

import useAuth from "@/hooks/users/useAuth";
import useUserStore from "@/zustand/useUserStore";

import MenuItem from "@/components/admins/aside/MenuItem";

const StudentAsideDashboard = ({
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
      className={`fixed md:relative ease-in-out duration-300 z-10 w-full overflow-hidden font-semibold overflow-y-auto h-screen md:overflow-y-auto sm:w-72 bg-base-300 ${
        !menuOpen && "hidden"
      }`}
    >
      <div
        className={`sticky top-0 right-0 flex justify-end p-4 backdrop-blur`}
      >
        <RiMenuFoldLine
          className="cursor-pointer"
          size={30}
          onClick={() => setMenuOpen(false)}
        />
      </div>
      <div className="px-4">
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

export default StudentAsideDashboard;
