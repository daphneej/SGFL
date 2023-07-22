import { useAppContext } from "../../context/AppContext";
import { useState, useEffect } from "react";
import video from "../../assets/lesson.mp4";
import { actions } from "../../context/actions/appActions";

const Course = ({ course }) => {
  const { coursesInCart, dispatch } = useAppContext();
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const { ADD_COURSES_TO_CART, REMOVE_COURSES_TO_CART } = actions;

  const handleAddToCart = () => {
    if (alreadyInCart) {
      dispatch({ type: REMOVE_COURSES_TO_CART, payload: course.id });
    } else {
      dispatch({ type: ADD_COURSES_TO_CART, payload: course });
    }
  };

  useEffect(() => {
    setAlreadyInCart(
      coursesInCart.filter((eachCourse) => eachCourse.id === course.id).length >
        0
    );

    localStorage.setItem("coursesInCart", JSON.stringify(coursesInCart));
  }, [coursesInCart]);

  return (
    <li className="card w-[95%] md:w-96 bg-base-100 shadow-xl">
      <video className="w-full rounded-t-2xl" controls>
        <source src={video} type="video/mp4" />
      </video>
      <div className="card-body">
        <p className="w-full font-bold text-xl text-base-950">
          {course.title.length > 30
            ? `${course.title.substring(0, 30)}...`
            : course.title}
        </p>
        <p className="w-full text-neutral-400">
          {course.description.length > 65
            ? `${course.description.substring(0, 65)}...`
            : course.description}
        </p>
        <p className="font-bold italic my-2">
          {course.trainer.firstName} {course.trainer.lastName}
        </p>
        <div className="card-actions items-center">
          <button
            className={`btn w-full md:w-fit ${
              alreadyInCart ? "btn-outline" : "btn-primary"
            }`}
            onClick={handleAddToCart}
          >
            {alreadyInCart ? (
              <span>Retirer au panier</span>
            ) : (
              <span>Ajouter au panier</span>
            )}
          </button>
          <p className="text-center md:text-right">
            $<span className="font-bold">{course.price}</span> US
          </p>
        </div>
      </div>
    </li>
  );
};

export default Course;
