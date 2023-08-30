import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { FiLogOut, FiUser } from "react-icons/fi";
import { MdOutlineSpaceDashboard, MdOutlineBook } from "react-icons/md";

import useUserStore from "@/zustand/useUserStore";
import useAuth from "@/hooks/users/useAuth.js";

import logoColor from "@/assets/images/logo-color.png";

import CourseInCartModal from "@/components/users/CourseInCartModal";

const Navbar = () => {
  const { logoutUser } = useAuth();
  const { user, setUser } = useUserStore();

  const [openCourseInCart, setOpenCourseInCart] = useState(false);

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
    <nav className="p-4 bg-base-300 navbar md:p-2">
      <div className="container flex-col items-center justify-between gap-4 mx-auto md:flex-row">
        <Link
          to={"/"}
          className="flex items-center w-56 p-1 rounded-lg text-neutral-100 md:w-28"
        >
          <img src={logoColor} alt="Logo" className="w-full h-full" />
        </Link>

        <CourseInCartModal
          openCourseInCart={openCourseInCart}
          setOpenCourseInCart={setOpenCourseInCart}
        />

        <div className="flex flex-col items-center gap-4 md:flex-row">
          {user ? (
            <div className="flex items-center justify-center gap-4 mt-2 md:w-auto md:mt-0">
              {/* Panier */}
              {user?.role !== "ADMIN" && (
                <div className="dropdown md:dropdown-end">
                  <label
                    tabIndex={0}
                    className="bg-base-100 hover:bg-base-200 btn btn-circle"
                  >
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
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
                        {user?.coursesInCart?.length}
                      </span>
                    </div>
                  </label>
                  <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow"
                  >
                    <div className="rounded-md bg-base-300 card-body">
                      <span className="text-lg font-bold">
                        {user?.coursesInCart?.length} Cours
                      </span>
                      <p>
                        Total :{" "}
                        <span className="text-info">
                          {user?.coursesInCart
                            ?.reduce((sum, course) => {
                              return sum + course.price;
                            }, 0)
                            .toFixed(2)}{" "}
                        </span>{" "}
                        US
                      </p>
                      <div className="card-actions">
                        <button
                          className="text-white btn bg-primary hover:bg-neutral btn-block rounded-xl hover:text-black-focus"
                          onClick={() => setOpenCourseInCart(true)}
                        >
                          Voir le panier
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profil de l'utilisateur */}
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="bg-base-100 hover:bg-base-200 btn btn-circle avatar"
                >
                  <div className="w-10 h-10 rounded-full">
                    <p className="flex items-center justify-center w-full h-full text-2xl font-bold">
                      {user?.email?.at(0)}
                    </p>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-md dropdown-content z-[1] shadow bg-base-300 mt-4 gap-1 rounded-md"
                >
                  <li>
                    <p className="p-2 mb-4 text-sm font-bold text-center rounded-lg bg-base-100">
                      {user?.email}
                    </p>
                  </li>

                  <li className="mb-1 font-bold text-md">Utilisateur</li>

                  {(user.role === "ADMIN" ||
                    user.role === "TRAINER" ||
                    user.role === "STUDENT") && (
                    <li>
                      <Link
                        to={`/dashboard/${
                          user?.role === "ADMIN" && "admins" ||
                          user?.role === "TRAINER" && "trainers" ||
                          user?.role === "STUDENT" && "students"
                        }`}
                      >
                        <MdOutlineSpaceDashboard />
                        Dashboard
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link to={`/courses`}>
                      <MdOutlineBook />
                      Cours
                    </Link>
                  </li>

                  <li>
                    <Link to={"/profile"}>
                      <FiUser />
                      Profil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOutUser}
                      className="text-red-500 bg-neutral hover:text-red-500"
                    >
                      <FiLogOut />
                      Déconnexion
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            // Éléments d'authentification et de connexion
            <ul className="flex gap-2 p-1">
              <li>
                <Link
                  className="text-white btn btn-sm bg-primary hover:bg-neutral"
                  to="/register"
                >
                  Inscription
                </Link>
              </li>
              <li>
                <Link
                  className="text-white btn btn-sm bg-primary hover:bg-neutral"
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
