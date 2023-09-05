import useUserStore from "@/zustand/useUserStore";
import image from "@/assets/images/lesson.jpeg";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/index";

const EnrolledCourses = () => {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col">
      <h2 className="mt-10 mb-4 text-2xl font-bold text-right">
        Cours Achetés
      </h2>

      <div className="flex flex-col mt-8">
        {user?.enrolledCourses?.length === 0 ? (
          <div className="flex items-center justify-center w-full">
            <h2 className="text-xl font-bold text-center">
              Vous N'Avez Pas Encore De Cours
            </h2>
          </div>
        ) : (
          <ul className="flex flex-wrap items-center justify-center gap-10">
            {user?.enrolledCourses?.map((course) => (
              <li
                key={course.id}
                className="flex flex-col w-full p-4 list-none rounded-lg shadow-sm md:w-72 shadow-primary bg-base-300"
              >
                <img
                  src={course?.thumbnailUrl}
                  alt="Course Image"
                  className="rounded-xl"
                />

                <div className="flex flex-col justify-between flex-1 pt-4">
                  <div className="flex flex-col h-full">
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
                  <div className="flex flex-col justify-between flex-1 mt-4">
                    <div className="flex gap-1 my-2 text-sm font-bold text-gray-500">
                      <p>
                        {course?.trainer?.firstName} {course?.trainer?.lastName}
                      </p>
                      {" • "}
                      <p>{formatDate(course?.createdAt)}</p>
                    </div>
                    <div className="flex flex-col-reverse items-start justify-between md:flex-row-reverse md:items-center">
                      {user && (
                        <button
                          className="w-full text-white btn rounded-xl md:w-fit bg-primary hover:bg-white hover:text-black"
                          onClick={() =>
                            toast.success(
                              "Fonctionnalité en cours de développement"
                            )
                          }
                        >
                          Suivre Le Cours
                        </button>
                      )}
                      <p className="my-2 font-bold text-gray-600 md:text-right md:my-0">
                        $<span className="text-primary">{course?.price}</span>{" "}
                        US
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

export default EnrolledCourses;
