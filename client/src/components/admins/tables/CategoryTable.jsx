import { useMutation } from "react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import useCategory from "@/hooks/useCategory";
import useUserStore from "@/zustand/useUserStore";

import { queryClient } from "@/index";

import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

import Pagination from "@/components/Pagination";

import CategoryAddFormModal from "@/components/admins/categories/CategoryAddFormModal";
import CategoryUpdateFormModal from "@/components/admins/categories/CategoryUpdateFormModal";
import CategoryViewModal from "@/components/admins/categories/CategoryViewModal";

const COLUMNS = [
  { label: "ID", key: "id" },
  { label: "Nom", key: "name" },
  { label: "Cours", key: "courses" },
  { label: "Actions", key: "actions" },
];

const CategoryTable = ({ isLoadingCategories: isLoading, categories }) => {
  const { user } = useUserStore();
  const { removeCategory } = useCategory();
  const itemsPerPage = 10;

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const { mutate } = useMutation({
    mutationKey: "categories",
    mutationFn: removeCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("categories");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleRemoveCategory = async (categoryId) => {
    mutate({ categoryId, token: user.token });
  };

  return (
    <div className="flex flex-col justify-between flex-1 w-full gap-2 overflow-auto text-center">
      <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
        <h2 className="text-2xl font-semibold text-left">
          Liste Des Catégories
        </h2>

        <button
          className="w-full text-white border-none outline-none btn bg-primary hover:bg-neutral md:w-fit"
          onClick={() => setModalAddOpen(true)}
        >
          Ajouter Une Nouvelle Catégorie
        </button>
      </div>

      <div className="flex flex-col flex-1 gap-2 pb-4 overflow-x-auto">
        <CategoryAddFormModal
          modalOpen={modalAddOpen}
          setModalOpen={setModalAddOpen}
        />

        <CategoryUpdateFormModal
          selectedCategory={selectedCategory}
          modalOpen={modalUpdateOpen}
          setModalOpen={setModalUpdateOpen}
        />

        <CategoryViewModal
          selectedCategory={selectedCategory}
          modalOpen={modalViewOpen}
          setModalOpen={setModalViewOpen}
        />

        {categories?.length === 0 ? (
          <p className="mx-auto my-8 text-xl font-bold text-center text-neutral-500">
            Aucune catégorie n'a été trouvée
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

                {currentCategories?.map((category) => (
                  <tr
                    key={category.id}
                    className={`hover:bg-base-100 ${
                      category.id % 2 !== 0 ? "bg-base-300" : "bg-base-200"
                    }`}
                  >
                    <td className="p-3 border border-base-100">
                      {category.id}
                    </td>
                    <td className="p-3 border border-base-100">
                      {category.name}
                    </td>
                    <td className="p-3 border border-base-100">
                      {category?.courses?.length}
                    </td>
                    <td className="p-3 border border-base-100">
                      <div className="flex justify-center gap-3 mx-auto">
                        <FiEye
                          className="cursor-pointer text-primary hover:underline"
                          size={18}
                          onClick={() => {
                            setSelectedCategory(category);
                            setModalViewOpen(true);
                          }}
                        />
                        <FiEdit
                          className="text-green-500 cursor-pointer hover:underline"
                          size={18}
                          onClick={() => {
                            setSelectedCategory(category);
                            setModalUpdateOpen(true);
                          }}
                        />
                        <FiTrash2
                          onClick={() => handleRemoveCategory(category.id)}
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
              contents={categories}
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

export default CategoryTable;
