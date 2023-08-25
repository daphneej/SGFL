import { Link } from "react-router-dom";

const MenuItem = ({
  label,
  icon,
  menuItem,
  selectedMenuItem,
  setSelectedMenuItem,
  link,
}) => {
  const values = (
    <>
      {icon}
      {label}
    </>
  );

  return (
    <li className="mt-3">
      {!link ? (
        <button
          className={`w-full py-2 flex items-center border-b border-gray-300 ${
            selectedMenuItem === menuItem
              ? "text-primary"
              : "hover:text-primary"
          }`}
          onClick={() => setSelectedMenuItem(menuItem)}
        >
          {values}
        </button>
      ) : (
        <Link
          to={link}
          className="flex items-center w-full py-2 border-b border-gray-300 hover:text-primary"
        >
          {values}
        </Link>
      )}
    </li>
  );
};

export default MenuItem;
