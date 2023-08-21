import { useMutation } from "react-query";
import { toast } from "react-toastify";
import video from "../../assets/videos/lesson.mp4";
import useAuth from "../../hooks/useAuth";

import useUserStore from "../../zustand/useUserStore.js";

import { formatDate } from "../../utils/index";

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
    <li className="flex flex-col w-full md:w-96 p-4 rounded-lg shadow-sm shadow-primary list-none">
      <video className="rounded-xl" controls>
        <source src={video} type="video/mp4" />
      </video>
      <div className="flex-1 flex flex-col justify-between py-4">
        <div className="h-full flex flex-col">
          <p className="text-xl text-left font-bold">
            {course.title.length > 20
              ? `${course.title.substring(0, 20)}...`
              : course.title}
          </p>
          <p className="text-gray-500 text-left my-1">
            {course.description.length > 60
              ? `${course.description.substring(0, 60)}...`
              : course.description}
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-between mt-4">
          <div className="flex gap-1 my-2 text-sm font-bold text-gray-500">
            <p>
              {course.trainer.firstName} {course.trainer.lastName}
            </p>
            {" • "}
            <p>{formatDate(course.createdAt)}</p>
          </div>
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between">
            {user && (
              <button
                className={`btn rounded-xl w-full md:w-fit ${
                  user.coursesInCart?.find(
                    (eachCourse) => eachCourse.id === course.id
                  )
                    ? "btn-outline"
                    : "btn-primary"
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
            <p className="md:text-right text-gray-600 font-bold my-2 md:my-0">
              $<span className="text-primary">{course.price}</span> US
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Course;
