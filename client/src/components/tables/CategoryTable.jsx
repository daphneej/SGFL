import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "../Pagination";

const CategoryTable = ({ categories }) => {
  const itemsPerPage = 6; // Number of items to show per page

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="text-center">
      <div className="flex justify-between items-center my-8">
        <h2 className="text-left text-2xl font-semibold">Categories</h2>

        <Link
          to={"/add-user"}
          className="btn bg-primary text-white outline-none border-none hover:bg-gray-800"
        >
          Add New Category
        </Link>
      </div>
      <table className="w-full mx-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border border-gray-300">ID</th>
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories?.map((category) => (
            <tr
              key={category.id}
              className={
                category.id % 2 !== 0
                  ? "bg-gray-100"
                  : "bg-white hover:bg-gray-200"
              }
            >
              <td className="p-3 border">{category.id}</td>
              <td className="p-3 border">{category.name}</td>
              <td className="p-3 border">
                <div className="flex gap-2 mx-auto justify-center">
                  <FiEdit className="text-green-500 hover:underline" />
                  <FiTrash2 className="text-red-500 hover:underline" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <Pagination
        contents={categories}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CategoryTable;
