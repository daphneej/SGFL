const Pagination = ({
  contents,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}) => {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center">
      <nav className="inline-flex rounded-md shadow">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-l-md border border-base-300 font-medium ${
            currentPage === 1 ? "bg-base-300" : "bg-base-200 hover:bg-base-100"
          }`}
        >
          Prev
        </button>
        {Array.from(
          { length: Math.ceil(contents?.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border-t border-b font-medium border-base-300 ${
                currentPage === i + 1
                  ? "bg-primary text-white hover:bg-base-100 hover:text-primary"
                  : "bg-base-300 text-gray-500 hover:bg-base-200"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(contents?.length / itemsPerPage)}
          className={`px-3 py-1 rounded-r-md border-t border-b font-medium border-base-300 ${
            currentPage === Math.ceil(contents?.length / itemsPerPage)
              ? "bg-base-200"
              : "bg-base-300 hover:bg-base-100"
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
