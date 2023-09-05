import { useQuery } from "react-query";

import useCourse from "@/hooks/useCourse";
import useUserStore from "@/zustand/useUserStore";
import { formatDate } from "../../utils/index";

const CreatedCourses = () => {
  const { getCourses } = useCourse();
  const { user } = useUserStore();

  const { isLoading, data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  return (
    <div className="flex flex-col w-full">
      <h2 className="mt-10 mb-4 text-2xl font-bold text-center md:text-right">
        Mes Cours
      </h2>

      <div className="flex flex-col">
        {isLoading && (
          <div className="flex items-center justify-center w-full">
            <div className="loading"></div>
          </div>
        )}

        {courses?.filter((course) => course?.trainer?.id === user?.id)
          .length === 0 ? (
          <div className="flex items-center justify-center w-full">
            <h2 className="text-xl font-bold text-center">
              No Courses Created Yet
            </h2>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-2 lg:grid-cols-3">
            {courses
              ?.filter((course) => course?.trainer?.id === user?.id)
              .map((course) => (
                <li
                  key={course?.id}
                  className="flex flex-col w-full p-4 list-none rounded-lg shadow-sm md:w-72 shadow-primary"
                >
                  <img
                    className="rounded-xl h-1/2"
                    loading="lazy"
                    src={course?.thumbnailUrl}
                    alt="Image Preview"
                  />

                  <div className="flex flex-col justify-between flex-1 py-4">
                    <div className="flex flex-col h-full">
                      <p className="text-xl font-bold text-left">
                        {course?.title?.length > 20
                          ? `${course?.title?.substring(0, 20)}...`
                          : course?.title}
                      </p>
                      <p className="my-1 text-left text-gray-500">
                        {course?.description?.length > 150
                          ? `${course?.description?.substring(0, 150)}...`
                          : course?.description}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between flex-1 mt-4">
                      <div className="flex gap-1 my-2 text-sm font-bold text-gray-500">
                        <p>
                          {course?.trainer?.firstName}{" "}
                          {course?.trainer?.lastName}
                        </p>
                        {" • "}
                        <p>
                          {course?.createdAt && formatDate(course?.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-col-reverse items-start justify-between md:flex-row md:items-center">
                        <p className="my-2 font-bold text-gray-600 md:text-right md:my-0">
                          $<span className="text-primary">{course?.price}</span>{" "}
                          US
                        </p>

                        <p className="text-xs font-bold">
                          {course?.published ? (
                            <span className="text-success">Publié</span>
                          ) : (
                            <span className="text-warning">En Attente</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreatedCourses;
