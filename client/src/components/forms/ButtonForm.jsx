const ButtonForm = ({ isLoading, label, primary, handleClick }) => {
  return primary ? (
    <button
      type="submit"
      className={`flex-1 btn rounded-lg ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-primary hover:bg-primary text-white"
      } text-white font-semibold`}
      disabled={isLoading}
    >
      {isLoading ? <div className="loading"></div> : <span>{label}</span>}
    </button>
  ) : (
    <button
      type="button"
      onClick={handleClick}
      className="flex-1 px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
    >
      {label}
    </button>
  );
};

export default ButtonForm;
