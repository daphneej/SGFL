import video from "../../assets/lesson.mp4";

import useUserStore from "../../zustand/useUserStore.js";

const Course = ({ course }) => {
  const { user, coursesInCart, addCourseInCart, removeCourseInCart } =
    useUserStore();

  const handleAddToCart = () => {
    if (coursesInCart.find((eachCourse) => eachCourse.id === course.id)) {
      removeCourseInCart(course.id);
    } else {
      addCourseInCart(course);
    }
  };

  return (
    <li className="card w-[95%] md:w-96 bg-base-300 shadow-xl">
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
          {user && (
            <button
              className={`btn w-full md:w-fit ${
                coursesInCart.find((eachCourse) => eachCourse.id === course.id)
                  ? "btn-neutral"
                  : "btn-primary"
              }`}
              onClick={handleAddToCart}
            >
              {coursesInCart.find(
                (eachCourse) => eachCourse.id === course.id
              ) ? (
                <span>Retirer au panier</span>
              ) : (
                <span>Ajouter au panier</span>
              )}
            </button>
          )}
          <p className="text-center md:text-right">
            $<span className="font-bold">{course.price}</span> US
          </p>
        </div>
      </div>
    </li>
  );
};

export default Course;
