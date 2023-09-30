import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { queryClient } from "../../index";

import useCourse from "@/hooks/useCourse";
import useUserStore from "@/zustand/useUserStore";

import { formatDate } from "@/utils/index";

const Course = ({ course }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const {
    getCartCourses,
    getPaidCourses,
    addCourseToUserCart,
    removeCourseToUserCart,
  } = useCourse();

  const { data: coursesInCart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartCourses({ token: user?.token }),
    enabled: Boolean(user?.token),
  });

  const { data: paidCourses } = useQuery({
    queryKey: ["paid-courses"],
    queryFn: () => getPaidCourses({ token: user?.token }),
    enabled: Boolean(user?.token),
  });

  const { isLoading: isLoadingAddToCart, mutate: addCourseToUserCartMutate } =
    useMutation(["cart"], addCourseToUserCart, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
        toast.success(data?.message);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
        }
      },
    });

  const {
    isLoading: isLoadingRemoveFromCart,
    mutate: removeCourseToUserCartMutate,
  } = useMutation(["cart"], removeCourseToUserCart, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      toast.success(data?.message);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleAddCourseToCart = () => {
    addCourseToUserCartMutate({ courseId: course?.id, token: user?.token });
  };

  const handleRemoveCourseToCart = () => {
    removeCourseToUserCartMutate({
      coursesIds: [course?.id],
      token: user?.token,
    });
  };

  return (
    <li className="flex flex-col w-full p-4 list-none rounded-lg shadow-sm md:w-72 shadow-primary">
      <img
        className="rounded-xl max-h-52 object-cover"
        loading="lazy"
        src={course?.thumbnailUrl}
        alt="Image Preview"
      />

      <div className="flex flex-col justify-between flex-1 pt-4">
        <div className="flex flex-col h-1/2">
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
        <div className="flex flex-col justify-between flex-1">
          <div className="flex gap-1 my-2 text-sm font-bold text-gray-500">
            <p>
              {course?.trainer?.firstName} {course?.trainer?.lastName}
            </p>
            {" • "}
            <p>{course?.createdAt && formatDate(course?.createdAt)}</p>
          </div>
          <div className="flex flex-col-reverse items-start justify-between md:flex-row md:items-center">
            {user && (
              <button
                className={`btn rounded-xl w-full md:w-fit ${
                  paidCourses?.find(
                    (eachCourse) => eachCourse?.id === course?.id
                  )
                    ? "bg-black text-white hover:bg-warning-focus"
                    : coursesInCart?.find(
                        (eachCourse) => eachCourse?.id === course?.id
                      )
                    ? "btn-outline"
                    : "bg-primary text-white hover:bg-gray-400 hover:text-black"
                }`}
                onClick={
                  paidCourses?.find(
                    (eachCourse) => eachCourse?.id === course?.id
                  )
                    ? () => {
                        navigate("/dashboard/students");
                      }
                    : coursesInCart?.find(
                        (eachCourse) => eachCourse?.id === course?.id
                      )
                    ? handleRemoveCourseToCart
                    : handleAddCourseToCart
                }
              >
                {isLoadingAddToCart || isLoadingRemoveFromCart ? (
                  <div className="loading"></div>
                ) : paidCourses?.find(
                    (eachCourse) => eachCourse?.id === course?.id
                  ) ? (
                  <span>Déjà Acheté</span>
                ) : coursesInCart?.find(
                    (eachCourse) => eachCourse?.id === course?.id
                  ) ? (
                  <span>Retirer au panier</span>
                ) : (
                  <span>Ajouter au panier</span>
                )}
              </button>
            )}
            <p className="my-2 font-bold text-gray-600 md:text-right md:my-0">
              $<span className="text-primary">{course?.price}</span> US
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Course;
