import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { AxiosError } from "axios";

import useUser from "@/hooks/users/useUser";
import useUserStore from "@/zustand/useUserStore";

import Pagination from "@/components/Pagination";

import { queryClient } from "@/index";
import UserAddFormModal from "@/components/users/UserAddFormModal";
import UserUpdateFormModal from "@/components/users/UserUpdateFormModal";

const COLUMNS = ["ID", "Prénom", "Nom", "Email", "Rôle", "Actions"];

const UserTable = ({ isLoadingUsers: isLoading, users }) => {
  const { user } = useUserStore();
  const { removeUser, getUser } = useUser();
  const itemsPerPage = 7;

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users?.slice(indexOfFirstItem, indexOfLastItem);

  const { data: selectedUser } = useQuery({
    queryFn: () => getUser(selectedUserId),
    enabled: Boolean(selectedUserId),
  });

  const { mutate } = useMutation({
    mutationKey: "users",
    mutationFn: removeUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleRemoveUser = async (userId) => {
    mutate({ userId, token: user.token });
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-between my-8">
        <h2 className="text-2xl font-semibold text-left">Users</h2>

        <button
          className="text-white border-none outline-none btn bg-primary hover:bg-neutral"
          onClick={() => setModalAddOpen(true)}
        >
          Add New User
        </button>
      </div>

      <UserAddFormModal
        modalOpen={modalAddOpen}
        setModalOpen={setModalAddOpen}
      />

      <UserUpdateFormModal
        selectedUser={selectedUser}
        modalOpen={modalUpdateOpen}
        setModalOpen={setModalUpdateOpen}
      />

      <table className="w-full mx-auto">
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

          {currentUsers?.map((user) => (
            <tr
              key={user.id}
              className={`hover:bg-base-100 ${
                user.id % 2 !== 0 ? "bg-base-300" : "bg-base-200"
              }`}
            >
              <td className="p-3 border border-base-100">{user.id}</td>
              <td className="p-3 border border-base-100">{user.firstName}</td>
              <td className="p-3 border border-base-100">{user.lastName}</td>
              <td className="p-3 border border-base-100">{user.email}</td>
              <td className="p-3 border border-base-100">{user.role}</td>
              <td className="p-3 border border-base-100">
                <div className="flex justify-center gap-3 mx-auto">
                  <FiEye
                    className="cursor-pointer text-primary hover:underline"
                    size={18}
                  />
                  <FiEdit
                    className="text-green-500 cursor-pointer hover:underline"
                    size={18}
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setModalUpdateOpen(true);
                    }}
                  />
                  <FiTrash2
                    onClick={() => handleRemoveUser(user.id)}
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
        contents={users}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UserTable;
