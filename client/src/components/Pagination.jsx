import React from "react";

function Pagination({ contents, currentPage, itemsPerPage, setCurrentPage }) {
  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex rounded-md shadow">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-l-md border font-medium ${
            currentPage === 1
              ? "bg-gray-200 text-gray-600"
              : "bg-white text-gray-500 hover:bg-gray-100"
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
              className={`px-3 py-1 border-t border-b font-medium ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(contents?.length / itemsPerPage)}
          className={`px-3 py-1 rounded-r-md border-t border-b font-medium ${
            currentPage === Math.ceil(contents?.length / itemsPerPage)
              ? "bg-gray-200 text-gray-600"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
