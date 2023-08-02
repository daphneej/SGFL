import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useUserStore from "../zustand/useUserStore";
import useAuth from "../hooks/useAuth.js";

const Navbar = () => {
  const { logoutUser } = useAuth();

  const { user, setUser, coursesInCart } = useUserStore();

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
    <nav className="flex flex-col justify-center md:flex-row md:justify-between items-center p-4 md:px-28 gap-4 sticky top-0 z-10 bg-neutral">
      <Link
        to={"/"}
        className="flex items-center p-2 rounded-lg text-neutral-100"
      >
        <span className="text-3xl font-black">NTB</span>
        <span className="">NoFake</span>
      </Link>

      {user ? (
        <div className="md:w-auto flex justify-center items-center gap-4">
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
                  {coursesInCart.length}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow"
            >
              <div className="card-body bg-base-300 rounded-xl">
                <span className="font-bold text-lg">
                  {coursesInCart.length} Cours
                </span>
                <span className="text-info">
                  Subtotal: $
                  {coursesInCart
                    .reduce((sum, course) => {
                      return sum + course.price;
                    }, 0)
                    .toFixed(2)}{" "}
                  US
                </span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block rounded-xl">
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
              className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-xl w-52 mt-4"
            >
              <li>
                <Link
                  to={"/profile"}
                  className="justify-between"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className=""
                  onClick={handleLogOutUser}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // Auth Login Items
        <ul className="flex gap-8 text-base-100">
          <li>
            <Link to="/register">Inscription</Link>
          </li>
          <li>
            <Link to="/login">Connexion</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
