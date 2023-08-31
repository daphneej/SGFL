import { useMutation } from "react-query";
import { toast } from "react-toastify";

import useAuth from "@/hooks/users/useAuth";
import useUserStore from "@/zustand/useUserStore";

import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin2Line, RiShoppingCart2Line } from "react-icons/ri";

const CourseInCartModal = ({ openCourseInCart, setOpenCourseInCart }) => {
  const { user, setUser } = useUserStore();
  const { toggleUserCourseInCart, buyCourseInCart } = useAuth();

  const { isLoading, mutate } = useMutation(["user"], toggleUserCourseInCart, {
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

  const { isLoading: isLoadingBoughtCourses, mutate: buyCourseMutation } = useMutation(
    ["user"], buyCourseInCart, {
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

  const handleToggleCourseInCart = (courseId) => {
    mutate({
      ...user,
      coursesInCart: [{ id: courseId }],
      token: user.token,
    });
  };

  const handleBuyCourseInCart = (courseId) => {
    buyCourseMutation({
      ...user,
      enrolledCourses: [{ id: courseId }],
      token: user.token,
    });
  };

  return (
    <div
      className={`flex justify-center items-center w-full h-full modal bg-blend-overlay ${
        openCourseInCart && "modal-open"
      }`}
    >
      <div className="shadow-md bg-base-300 modal-box shadow-primary">
        <AiOutlineClose
          className="absolute cursor-pointer top-4 right-4"
          onClick={() => setOpenCourseInCart(false)}
        />

        <div className="my-4 cart-container">
          <div className="flex flex-col items-center justify-between gap-1 my-8 md:flex-row">
            <h2 className="text-2xl font-bold cart-title">Votre panier</h2>
            <p className="text-gray-600 cart-subtitle">
              Total: $
              <span className="font-bold text-primary">
                {user?.coursesInCart
                  ?.reduce((acc, course) => acc + course?.price, 0)
                  .toFixed(2)}
              </span>{" "}
              US
            </p>
          </div>
          {user?.coursesInCart?.length === 0 ? (
            <p className="font-bold text-center text-gray-600">
              Votre panier est vide
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {user?.coursesInCart?.map((course) => (
                <li
                  key={course?.id}
                  className="flex items-start justify-between gap-1 p-4 rounded-lg shadow-sm bg-base-100 shadow-primary cart-item"
                >
                  <div className="w-2/3">
                    <h3 className="font-semibold course-title">
                      {course?.title}
                    </h3>
                    <p className="text-gray-600 course-price">
                      $
                      <span className="font-bold text-primary">
                        {course?.price.toFixed(2)}
                      </span>{" "}
                      US
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <div className="loading"></div>
                    ) : (
                      <RiDeleteBin2Line
                        onClick={() => handleToggleCourseInCart(course?.id)}
                        size={25}
                        className="cursor-pointer text-error"
                      />
                    )}
                    <RiShoppingCart2Line
                      size={25}
                      className="cursor-pointer text-success"
                      onClick={() => handleBuyCourseInCart(course?.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInCartModal;
