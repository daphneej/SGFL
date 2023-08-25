const MenuItem = ({
  label,
  icon,
  menuItem,
  selectedMenuItem,
  setSelectedMenuItem,
}) => {
  return (
    <li className="mt-3">
      <button
        className={`w-full py-2 flex items-center ${
          selectedMenuItem === menuItem ? "text-primary" : "hover:text-primary"
        }`}
        onClick={() => setSelectedMenuItem(menuItem)}
      >
        {icon}
        {label}
      </button>
      <div className="border-t border-gray-300"></div>
    </li>
  );
};

export default MenuItem;
