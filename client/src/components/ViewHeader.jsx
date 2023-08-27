const ViewHeader = ({ label, handleSkipClick }) => {
  return (
    <div className="flex flex-col-reverse items-center justify-between w-full gap-2 md:flex-row">
      <h2 className="text-2xl font-bold text-center">{label}</h2>
      <div className="flex items-center justify-center w-full gap-2 md:w-fit">
        <button
          type="button"
          onClick={handleSkipClick}
          className="flex-1 w-full px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg btn md:w-20 hover:bg-gray-400"
        >
          Passer
        </button>
      </div>
    </div>
  );
};

export default ViewHeader;
