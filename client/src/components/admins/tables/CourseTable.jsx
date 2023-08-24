import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

import Pagination from "@/components/Pagination";

const COLUMNS = ["ID", "Titre", "Description", "Prix", "Actions"];

const CourseTable = ({ isLoadingCourses: isLoading, courses }) => {
  const itemsPerPage = 7;

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="text-center">
      <div className="flex items-center justify-between my-8">
        <h2 className="text-2xl font-semibold text-left">Courses</h2>

        <Link
          to={"/add-user"}
          className="text-white border-none outline-none btn bg-primary hover:bg-gray-300 hover:text-black hover:bg-gray-800"
        >
          Add New Course
        </Link>
      </div>
      <table className="w-full mx-auto border">
        <thead className="bg-base-300">
          <tr>
            {COLUMNS.map((column, index) => (
              <th key={index} className="p-3 border border-base-100">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {isLoading && (
            <tr>
              <td className="p-2" colSpan={COLUMNS.length}>
                <div className="loading"></div>
              </td>
            </tr>
          )}

          {currentCourses?.map((course) => (
            <tr
              key={course.id}
              className={`hover:bg-base-300 ${
                course.id % 2 !== 0 ? "bg-base-100" : "bg-base-200"
              }`}
            >
              <td className="p-3 border border-base-100">{course.id}</td>
              <td className="p-3 border border-base-100">{course.title}</td>
              <td className="p-3 border border-base-100">
                {course.description}
              </td>
              <td className="p-3 border border-base-100">${course.price}</td>
              <td className="p-3 border border-base-100">
                <div className="flex justify-center gap-2 mx-auto">
                  <FiEye className="text-primary hover:underline" size={18} />
                  <FiEdit
                    className="text-green-500 cursor-pointer hover:underline"
                    size={18}
                  />
                  <FiTrash2
                    className="text-red-500 cursor-pointer hover:underline"
                    size={18}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <Pagination
        contents={courses}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CourseTable;
