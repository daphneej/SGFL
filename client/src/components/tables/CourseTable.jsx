import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "../Pagination";

const CourseTable = ({ courses }) => {
  const itemsPerPage = 10; // Number of items to show per page

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="text-center">
      <div className="flex justify-between items-center my-8">
        <h2 className="text-left text-2xl font-semibold">Courses</h2>

        <Link
          to={"/add-user"}
          className="btn bg-primary text-white outline-none border-none hover:bg-gray-800"
        >
          Add New Course
        </Link>
      </div>
      <table className="w-full mx-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border border-gray-300">ID</th>
            <th className="p-3 border border-gray-300">Title</th>
            <th className="p-3 border border-gray-300">Description</th>
            <th className="p-3 border border-gray-300">Price</th>
            <th className="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses?.map((course) => (
            <tr
              key={course.id}
              className={
                course.id % 2 !== 0
                  ? "bg-gray-100"
                  : "bg-white hover:bg-gray-200"
              }
            >
              <td className="p-3 border">{course.id}</td>
              <td className="p-3 border">{course.title}</td>
              <td className="p-3 border">{course.description}</td>
              <td className="p-3 border">${course.price}</td>
              <td className="p-3 border">
                <div className="flex gap-2 mx-auto justify-center">
                  <FiEye className="text-primary hover:underline" />
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
        contents={courses}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CourseTable;
