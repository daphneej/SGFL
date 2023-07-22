import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext.jsx";
import useAuth from "../hooks/useAuth.js";

const Navbar = () => {
  const { user, coursesInCart } = useAppContext();
  const { successMessage, logoutUser } = useAuth();

  const handleLogOutUser = async () => {
    await logoutUser(user);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <nav className="flex flex-col justify-center md:flex-row md:justify-between items-center bg-neutral text-white p-4 gap-4">
      <Link to={"/"}>NTB NoFake</Link>

      {user ? (
        <div className="flex justify-between items-center gap-4">
          {/* Cart */}
          <div className="dropdown dropdown-end">
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
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body bg-neutral rounded-box">
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
                  <button className="btn btn-primary btn-block">
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
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52"
            >
              <li>
                <Link
                  to={"/profile"}
                  className="justify-between hover:text-neutral-300"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="hover:text-neutral-300"
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
        <ul className="flex gap-8">
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
