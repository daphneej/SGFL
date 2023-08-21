import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useUserStore from "../zustand/useUserStore";
import useAuth from "../hooks/useAuth.js";

import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { logoutUser } = useAuth();

  const { user, setUser } = useUserStore();

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
    <nav className="navbar bg-neutral p-4 md:p-2">
      <div className="container flex-col md:flex-row items-center justify-between mx-auto gap-4">
        <Link
          to={"/"}
          className="flex items-center p-1 rounded-lg text-neutral-100 w-56 md:w-28"
        >
          <img src={logo} alt="Logo" className="w-full h-full" />
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-4">
          {user && user.role === "ADMIN" && (
            <ul className="text-white">
              <li>
                <Link className="btn" to={"/admin"}>
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          )}
          {user ? (
            <div className="md:w-auto flex justify-center items-center gap-4 mt-2 md:mt-0">
              {/* Cart */}
              <div className="dropdown md:dropdown-end">
                <label tabIndex={0} className="btn btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-xs indicator-item">
                      {user.coursesInCart?.length}
                    </span>
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow"
                >
                  <div className="card-body bg-base-300 rounded-xl">
                    <span className="font-bold text-lg">
                      {user.coursesInCart?.length} Cours
                    </span>
                    <span className="text-info">
                      Subtotal: $
                      {user.coursesInCart
                        ?.reduce((sum, course) => {
                          return sum + course.price;
                        }, 0)
                        .toFixed(2)}{" "}
                      US
                    </span>
                    <div className="card-actions">
                      <button className="btn bg-primary btn-block rounded-xl hover:bg-primary-focus text-white">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Profile */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-circle avatar">
                  <div className="w-10 h-10 rounded-full">
                    <p className="w-full h-full flex justify-center items-center font-bold text-2xl">
                      {user.email.split("")[0]}
                    </p>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] p-4 shadow bg-base-300 rounded-xl min-w-52 mt-4"
                >
                  <p className="text-xs text-center mb-4 dark:text-white font-bold bg-white p-2 rounded-lg">
                    {user.email}
                  </p>

                  <li className="font-bold text-md mb-1">User</li>
                  <li>
                    <Link to={"/profile"}>Profile</Link>
                  </li>
                  <li>
                    <button className="" onClick={handleLogOutUser}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            // Auth Login Items
            <ul className="flex gap-2 p-1 text-white">
              <li>
                <Link
                  className="rounded-md py-2 px-4 hover:bg-neutral-100 hover:text-neutral"
                  to="/register"
                >
                  Inscription
                </Link>
              </li>
              <li>
                <Link
                  className="rounded-md py-2 px-4 hover:bg-neutral-100 hover:text-neutral"
                  to="/login"
                >
                  Connexion
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
