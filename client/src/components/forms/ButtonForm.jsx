const ButtonForm = ({ isLoading, label, primary, handleClick }) => {
  return primary ? (
    <button
      type="submit"
      className="flex-1 text-white btn bg-primary hover:bg-neutral"
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? <div className="loading"></div> : <span>{label}</span>}
    </button>
  ) : (
    <button
      type="button"
      onClick={handleClick}
      className="flex-1 btn btn-outline hover:bg-neutral hover:text-white hover:border-primary"
    >
      {label}
    </button>
  );
};

export default ButtonForm;
