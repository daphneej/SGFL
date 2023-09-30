import useUserStore from "@/zustand/useUserStore";
import { useState } from "react";
import { useQuery } from "react-query";

import useCourse from "@/hooks/useCourse";

import { formatDate } from "@/utils/index";

import WatchCourse from "./WatchCourse";

const PaidCourses = () => {
  const { user } = useUserStore();

  const { getPaidCourses } = useCourse();

  const { data: courses, isLoading } = useQuery({
    queryKey: ["paid-courses"],
    queryFn: () => getPaidCourses({ token: user.token }),
    enabled: Boolean(user?.token),
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="flex flex-col">
      <h2 className="mt-10 mb-4 text-2xl font-bold text-right">
        Cours Achetés
      </h2>

      {isLoading && <div className="loading"></div>}

      {selectedCourse && (
        <WatchCourse
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setSelectedCourse={setSelectedCourse}
          course={selectedCourse}
        />
      )}

      <div className="flex flex-col mt-8">
        {courses?.length === 0 ? (
          <div className="flex items-center justify-center w-full">
            <h2 className="text-xl font-bold text-center">
              Vous N'Avez Pas Encore De Cours
            </h2>
          </div>
        ) : (
          <ul className="flex flex-wrap justify-center gap-8 py-8 text-center">
            {courses?.map((course) => {
              return (
                <li
                  key={course.id}
                  className="flex flex-col w-full p-4 list-none rounded-lg shadow-sm md:w-72 shadow-primary cursor-pointer"
                  onClick={() => {
                    setSelectedCourse(course);
                    setModalOpen(true);
                  }}
                >
                  <img
                    className="rounded-xl h-1/2"
                    src={course?.thumbnailUrl}
                    alt="Course Image"
                  />

                  <div className="flex flex-col justify-between flex-1 pt-4">
                    <div className="flex flex-col h-2/3">
                      <p className="text-xl font-bold text-left">
                        {course?.title?.length > 20
                          ? `${course?.title?.substring(0, 20)}...`
                          : course?.title}
                      </p>
                      <p className="my-1 text-left text-gray-500">
                        {course?.description?.length > 60
                          ? `${course?.description?.substring(0, 60)}...`
                          : course?.description}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex gap-1 my-2 text-sm font-bold text-gray-500">
                        <p>
                          {course?.trainer?.firstName}{" "}
                          {course?.trainer?.lastName}
                        </p>
                        {" • "}
                        <p>{formatDate(course?.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PaidCourses;
