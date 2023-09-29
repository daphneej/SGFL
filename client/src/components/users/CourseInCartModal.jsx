import { useMutation, useQuery } from "react-query";
import { queryClient } from "../../index";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

import useCourse from "@/hooks/useCourse";
import useUserStore from "@/zustand/useUserStore";

import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin2Line, RiShoppingCart2Line } from "react-icons/ri";

const CourseInCartModal = ({ openCourseInCart, setOpenCourseInCart }) => {
  const { user } = useUserStore();
  const { buyCourseInCart, getCartCourses, removeCourseToUserCart } =
    useCourse();

  const { isLoading: isLoadingCart, data: coursesInCart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartCourses({ token: user?.token }),
    enabled: Boolean(user?.token),
  });

  const { isLoading, mutate: removeCourseToUserCartMutate } = useMutation({
    mutationKey: ["cart"],
    mutationFn: removeCourseToUserCart,
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

  const { isLoading: isLoadingBoughtCourses, mutate: buyCourseMutation } =
    useMutation(["user"], buyCourseInCart, {
      onSuccess: (data) => {
        (async () => {
          const stripe = await loadStripe(
            import.meta.env.VITE_STRIPE_PUBLIC_KEY
          );

          stripe.redirectToCheckout({
            sessionId: data?.session?.id,
          });
        })();
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
        }
      },
    });

  const handleRemoveCourseInCart = (coursesIds) => {
    removeCourseToUserCartMutate({
      coursesIds,
      token: user.token,
    });
  };

  const handleBuyCourseInCart = (items) => {
    buyCourseMutation({ items, token: user.token });
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

        {isLoadingCart && (
          <div className="flex items-center justify-center w-full">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
          </div>
        )}

        <div className="my-4 cart-container">
          <div className="flex flex-col items-center justify-between gap-1 my-8 md:flex-row">
            <h2 className="text-2xl font-bold cart-title">Votre panier</h2>
            <p className="text-gray-600 cart-subtitle">
              Total: ${" "}
              <span className="font-bold text-primary">
                {coursesInCart
                  ?.reduce((acc, course) => acc + course?.price, 0)
                  .toFixed(2)}
              </span>{" "}
              US
            </p>
          </div>
          {coursesInCart?.length === 0 ? (
            <p className="font-bold text-center text-gray-600">
              Votre panier est vide
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {coursesInCart?.map((course) => (
                <li
                  key={course?.id}
                  className="flex items-start justify-between gap-1 p-4 rounded-lg shadow-sm bg-base-100 shadow-primary cart-item"
                >
                  <div className="w-2/3">
                    <h3 className="font-semibold course-title">
                      {course?.title}
                    </h3>
                    <p className="text-gray-600 course-price">
                      ${" "}
                      <span className="font-bold text-primary">
                        {course?.price.toFixed(2)}
                      </span>{" "}
                      US
                    </p>
                  </div>
                  <div className="flex flex-col-reverse items-center justify-center gap-2">
                    <RiDeleteBin2Line
                      onClick={() => handleRemoveCourseInCart([course?.id])}
                      size={25}
                      className="cursor-pointer text-error"
                      disabled={isLoading || isLoadingBoughtCourses}
                    />
                    <RiShoppingCart2Line
                      size={25}
                      className="cursor-pointer text-success"
                      onClick={() =>
                        handleBuyCourseInCart([{ id: course?.id, quantity: 1 }])
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className={`w-full md:mt-10 rounded-md flex flex-col md:flex-row justify-between items-center ${
            coursesInCart?.length === 0 && "hidden"
          }`}
        >
          <button
            type="button"
            className="w-full md:w-fit btn bg-primary text-white"
            onClick={() =>
              handleRemoveCourseInCart(
                coursesInCart?.map((course) => course?.id)
              )
            }
          >
            Vider le panier
          </button>
          <button
            type="button"
            className="w-full md:w-fit btn bg-primary text-white"
            onClick={() =>
              handleBuyCourseInCart(
                coursesInCart?.map((course) => {
                  return { id: course?.id };
                })
              )
            }
          >
            Acheter tous les cours
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseInCartModal;
