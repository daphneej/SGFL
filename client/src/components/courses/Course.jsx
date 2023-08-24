import { useMutation } from "react-query";
import { toast } from "react-toastify";

import useAuth from "@/hooks/users/useAuth";
import useUserStore from "@/zustand/useUserStore";

import { formatDate } from "@/utils/index";

import video from "@/assets/videos/lesson.mp4";

const Course = ({ course }) => {
  const { user, setUser } = useUserStore();
  const { updateUser } = useAuth();

  const { isLoading, mutate } = useMutation("user", updateUser, {
    onSuccess: (data) => {
      toast.success(data.message);
      setUser(data.user);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleToggleCourseInCart = () => {
    mutate({
      ...user,
      coursesInCart: [{ id: course.id }],
      token: user.token,
    });
  };

  return (
    <li className="flex flex-col w-full p-4 list-none rounded-lg shadow-sm md:w-96 shadow-primary">
      <video className="rounded-xl" controls>
        <source src={video} type="video/mp4" />
      </video>
      <div className="flex flex-col justify-between flex-1 py-4">
        <div className="flex flex-col h-full">
          <p className="text-xl font-bold text-left">
            {course.title.length > 20
              ? `${course.title.substring(0, 20)}...`
              : course.title}
          </p>
          <p className="my-1 text-left text-gray-500">
            {course.description.length > 60
              ? `${course.description.substring(0, 60)}...`
              : course.description}
          </p>
        </div>
        <div className="flex flex-col justify-between flex-1 mt-4">
          <div className="flex gap-1 my-2 text-sm font-bold text-gray-500">
            <p>
              {course.trainer.firstName} {course.trainer.lastName}
            </p>
            {" • "}
            <p>{formatDate(course.createdAt)}</p>
          </div>
          <div className="flex flex-col-reverse items-start justify-between md:flex-row md:items-center">
            {user && (
              <button
                className={`btn rounded-xl w-full md:w-fit ${
                  user.coursesInCart?.find(
                    (eachCourse) => eachCourse.id === course.id
                  )
                    ? "btn-outline"
                    : "bg-primary text-white hover:bg-gray-400 hover:text-black"
                }`}
                onClick={handleToggleCourseInCart}
              >
                {isLoading ? (
                  <div className="loading"></div>
                ) : user.coursesInCart?.find(
                    (eachCourse) => eachCourse.id === course.id
                  ) ? (
                  <span>Retirer au panier</span>
                ) : (
                  <span>Ajouter au panier</span>
                )}
              </button>
            )}
            <p className="my-2 font-bold text-gray-600 md:text-right md:my-0">
              $<span className="text-primary">{course.price}</span> US
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Course;
