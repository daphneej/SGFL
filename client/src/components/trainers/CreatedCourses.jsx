import { useQuery } from "react-query";

import useCourse from "@/hooks/useCourse";
import useUserStore from "@/zustand/useUserStore";
import { useEffect } from "react";

const CreatedCourses = () => {
  const { getCourses } = useCourse();
  const { user } = useUserStore();

  const { isLoading, data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  return (
    <>
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
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses
              ?.filter((course) => course?.trainer?.id === user?.id)
              .map((course) => (
                <li
                  key={course?.id}
                  className="flex items-center justify-between px-6 py-4 transition duration-300 rounded-lg shadow-sm cursor-pointer bg-base-300 shadow-primary hover:shadow-lg"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{course?.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {course?.description}
                    </p>
                    <p className="mt-2 text-sm font-bold text-gray-600">
                      $<span className="text-blue-500">{course?.price}</span> US
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CreatedCourses;
