import { useMutation } from "react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import useUser from "@/hooks/users/useUser";
import useUserStore from "@/zustand/useUserStore";

import Pagination from "@/components/Pagination";

import { queryClient } from "@/index";

import UserAddFormModal from "@/components/admins/users/UserAddFormModal";
import UserUpdateFormModal from "@/components/admins/users/UserUpdateFormModal";
import UserViewModal from "@/components/admins/users/UserViewModal";

import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const COLUMNS = [
  { label: "ID", key: "id" },
  { label: "Prénom", key: "firstName" },
  { label: "Nom", key: "lastName" },
  { label: "Adresse Email", key: "email" },
  { label: "Rôle", key: "role" },
  { label: "Actions", key: "actions" },
];

const UserTable = ({ isLoadingUsers: isLoading, users }) => {
  const { user } = useUserStore();
  const { removeUser } = useUser();
  const itemsPerPage = 10;

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users?.slice(indexOfFirstItem, indexOfLastItem);

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
    <div className="flex flex-col justify-between flex-1 w-full gap-2 overflow-auto text-center">
      <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
        <h2 className="text-2xl font-semibold text-left">
          Liste Des Utilisateurs
        </h2>

        <button
          className="w-full text-white border-none outline-none btn bg-primary hover:bg-neutral md:w-fit"
          onClick={() => setModalAddOpen(true)}
        >
          Ajouter Un Nouvel Utilisateur
        </button>
      </div>

      <div className="flex flex-col flex-1 gap-2 pb-4 overflow-x-auto">
        <UserAddFormModal
          modalOpen={modalAddOpen}
          setModalOpen={setModalAddOpen}
        />

        <UserUpdateFormModal
          selectedUser={selectedUser}
          modalOpen={modalUpdateOpen}
          setModalOpen={setModalUpdateOpen}
        />

        <UserViewModal
          selectedUser={selectedUser}
          modalOpen={modalViewOpen}
          setModalOpen={setModalViewOpen}
        />

        {users?.length === 0 ? (
          <p className="mx-auto my-8 text-xl font-bold text-center text-neutral-500">
            Aucun utilisateur n'est enregistré
          </p>
        ) : (
          <>
            <table className="flex-1 w-full mx-auto">
              <thead className="bg-base-300">
                <tr>
                  {COLUMNS.map((column, index) => (
                    <th key={index} className="p-3 border border-base-100">
                      {column.label}
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
                    <td className="p-3 border border-base-100">
                      {user.firstName}
                    </td>
                    <td className="p-3 border border-base-100">
                      {user.lastName}
                    </td>
                    <td className="p-3 border border-base-100">{user.email}</td>
                    <td className="p-3 border border-base-100">{user.role}</td>
                    <td className="p-3 border border-base-100">
                      <div className="flex justify-center gap-3 mx-auto">
                        <FiEye
                          className="cursor-pointer text-primary hover:underline"
                          size={18}
                          onClick={() => {
                            setSelectedUser(user);
                            setModalViewOpen(true);
                          }}
                        />
                        <FiEdit
                          className="text-green-500 cursor-pointer hover:underline"
                          size={18}
                          onClick={() => {
                            setSelectedUser(user);
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
          </>
        )}
      </div>
    </div>
  );
};

export default UserTable;
