import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "../Pagination";

const UserTable = ({ users }) => {
  const itemsPerPage = 10; // Number of items to show per page

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="text-center">
      <div className="flex justify-between items-center my-8">
        <h2 className="text-left text-2xl font-semibold">Users</h2>

        <Link
          to={"/add-user"}
          className="btn bg-primary text-white outline-none border-none hover:bg-gray-800"
        >
          Add New User
        </Link>
      </div>
      <table className="w-full mx-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border border-gray-300">ID</th>
            <th className="p-3 border border-gray-300">First Name</th>
            <th className="p-3 border border-gray-300">Last Name</th>
            <th className="p-3 border border-gray-300">Email</th>
            <th className="p-3 border border-gray-300">Role</th>
            <th className="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers?.map((user) => (
            <tr
              key={user.id}
              className={
                user.id % 2 !== 0 ? "bg-gray-100" : "bg-white hover:bg-gray-200"
              }
            >
              <td className="p-3 border">{user.id}</td>
              <td className="p-3 border">{user.firstName}</td>
              <td className="p-3 border">{user.lastName}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.role}</td>
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
        contents={users}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UserTable;
