import { useMutation } from "react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import useCourse from "@/hooks/useCourse";
import useUserStore from "@/zustand/useUserStore";

import { queryClient } from "@/index";

import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

import Pagination from "@/components/Pagination";

import CourseAddFormModal from "@/components/admins/courses/CourseAddFormModal";
import CourseUpdateFormModal from "@/components/admins/courses/CourseUpdateFormModal";
import CourseViewModal from "@/components/admins/courses/CourseViewModal";

const COLUMNS = [
  { label: "ID", key: "id" },
  { label: "Titre", key: "title" },
  { label: "Formateur", key: "trainer" },
  { label: "Catégorie", key: "category" },
  { label: "Étudiants", key: "students" },
  { label: "Prix", key: "price" },
  { label: "Statut", key: "status" },
  { label: "Actions", key: "actions" },
];

const CourseTable = ({ isLoadingCourses: isLoading, courses }) => {
  const { user } = useUserStore();
  const { removeCourse } = useCourse();
  const itemsPerPage = 10;

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses?.slice(indexOfFirstItem, indexOfLastItem);

  const { mutate } = useMutation({
    mutationKey: "courses",
    mutationFn: removeCourse,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("courses");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleRemoveCourse = async (courseId) => {
    mutate({ courseId, token: user.token });
  };

  return (
    <div className="flex flex-col justify-between flex-1 w-full gap-4 overflow-auto text-center">
      <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
        <h2 className="text-2xl font-semibold text-left">Liste Des Cours</h2>

        <button
          className="w-full text-white border-none outline-none btn bg-primary hover:bg-neutral md:w-fit"
          onClick={() => setModalAddOpen(true)}
        >
          Ajouter Un Cours
        </button>
      </div>

      <div className="flex flex-col flex-1 gap-2 pb-4 overflow-x-auto">
        <CourseAddFormModal
          modalOpen={modalAddOpen}
          setModalOpen={setModalAddOpen}
        />

        <CourseUpdateFormModal
          selectedCourse={selectedCourse}
          modalOpen={modalUpdateOpen}
          setModalOpen={setModalUpdateOpen}
        />

        <CourseViewModal
          selectedCourse={selectedCourse}
          modalOpen={modalViewOpen}
          setModalOpen={setModalViewOpen}
        />

        {courses?.length === 0 ? (
          <p className="mx-auto my-8 text-xl font-bold text-center text-neutral-500">
            Aucun cours n'a été trouvé
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

                {currentCourses?.map((course) => (
                  <tr
                    key={course?.id}
                    className={`hover:bg-base-100 ${
                      course?.id % 2 !== 0 ? "bg-base-300" : "bg-base-200"
                    }`}
                  >
                    <td className="p-3 border border-base-100">{course?.id}</td>
                    <td className="p-3 border border-base-100">
                      {course?.title}
                    </td>
                    <td className="p-3 border border-base-100">
                      {course?.trainer?.firstName} {course?.trainer?.lastName}
                    </td>
                    <td className="p-3 border border-base-100">
                      {course?.category?.name}
                    </td>
                    <td className="p-3 border border-base-100">
                      {course?.students?.length}
                    </td>
                    <td className="p-3 border border-base-100">
                      $<span className="text-primary">{course?.price}</span> US
                    </td>
                    <td className="p-3 border border-base-100">
                      {course?.published ? (
                        <p className="text-success">Publié</p>
                      ) : (
                        <p className="text-warning">En Attente</p>
                      )}
                    </td>

                    <td className="p-3 border border-base-100">
                      <div className="flex justify-center gap-3 mx-auto">
                        <FiEye
                          className="cursor-pointer text-primary hover:underline"
                          size={18}
                          onClick={() => {
                            setSelectedCourse(course);
                            setModalViewOpen(true);
                          }}
                        />
                        <FiEdit
                          className="text-green-500 cursor-pointer hover:underline"
                          size={18}
                          onClick={() => {
                            setSelectedCourse(course);
                            setModalUpdateOpen(true);
                          }}
                        />
                        <FiTrash2
                          onClick={() => handleRemoveCourse(course?.id)}
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
        )}
      </div>
    </div>
  );
};

export default CourseTable;
