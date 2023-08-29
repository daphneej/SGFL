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
  { label: "Role", key: "role" },
  { label: "Cours Crées", key: "courses" },
  { label: "Actions", key: "actions" },
];

const TrainerTable = ({ isLoadingUsers: isLoading, users: trainers }) => {
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
  const currentTrainers = trainers?.slice(indexOfFirstItem, indexOfLastItem);

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
    mutate({ userId, token: user?.token });
  };

  return (
    <div className="flex flex-col justify-between flex-1 w-full gap-4 overflow-auto text-center">
      <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
        <h2 className="text-2xl font-semibold text-left">
          Liste Des Formateurs
        </h2>

        <button
          className="w-full text-white border-none outline-none btn bg-primary hover:bg-neutral md:w-fit"
          onClick={() => setModalAddOpen(true)}
        >
          Ajouter Un Nouvel Formateur
        </button>
      </div>

      <div className="flex flex-col flex-1 gap-2 pb-4 overflow-x-auto">
        <UserAddFormModal
          modalOpen={modalAddOpen}
          setModalOpen={setModalAddOpen}
          userRole={"TRAINER"}
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

        {trainers?.length === 0 ? (
          <p className="mx-auto my-8 text-xl font-bold text-center text-neutral-500">
            Aucun utilisateur n'est enregistré
          </p>
        ) : (
          <div className="flex flex-col gap-4">
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

                {currentTrainers?.map((trainer) => (
                  <tr
                    key={trainer?.id}
                    className={`hover:bg-base-100 ${
                      trainer?.id % 2 !== 0 ? "bg-base-300" : "bg-base-200"
                    }`}
                  >
                    <td className="p-3 border border-base-100">{trainer?.id}</td>
                    <td className="p-3 border border-base-100">
                      {trainer?.firstName}
                    </td>
                    <td className="p-3 border border-base-100">
                      {trainer?.lastName}
                    </td>
                    <td className="p-3 border border-base-100">
                      {trainer?.email}
                    </td>
                    <td className="p-3 border border-base-100">
                      {trainer?.role}
                    </td>
                    <td className="p-3 border border-base-100">
                      {trainer?.createdCourses?.length}
                    </td>
                    <td className="p-3 border border-base-100">
                      <div className="flex justify-center gap-3 mx-auto">
                        <FiEye
                          className="cursor-pointer text-primary hover:underline"
                          size={18}
                          onClick={() => {
                            setSelectedUser(trainer);
                            setModalViewOpen(true);
                          }}
                        />
                        <FiEdit
                          className="text-green-500 cursor-pointer hover:underline"
                          size={18}
                          onClick={() => {
                            setSelectedUser(trainer);
                            setModalUpdateOpen(true);
                          }}
                        />
                        <FiTrash2
                          onClick={() => handleRemoveUser(trainer?.id)}
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
              contents={trainers}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerTable;
