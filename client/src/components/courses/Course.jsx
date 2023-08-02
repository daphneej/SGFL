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
    <li className="card w-full md:w-80 h-[26rem] md:h-[24rem] bg-base-300 shadow-lg shadow-neutral rounded-xl">
      <video className="h-[10rem] w-full rounded-t-xl object-fill" controls>
        <source src={video} type="video/mp4" />
      </video>
      <div className="flex-1 flex flex-col justify-between p-4">
        <div className="flex-1 flex flex-col">
          <p className="w-full font-bold text-xl text-base-950 pb-2">
          {course.title.length > 20
            ? `${course.title.substring(0, 20)}...`
            : course.title}
        </p>
        <p className="flex-1 text-neutral-600">
          {course.description.length > 60
            ? `${course.description.substring(0, 60)}...`
            : course.description}
        </p>
        </div>
        <p className="font-bold italic my-4">
          {course.trainer.firstName} {course.trainer.lastName}
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          {user && (
            <button
              className={`btn rounded-xl w-full md:w-fit ${
                coursesInCart.find((eachCourse) => eachCourse.id === course.id)
                  ? "btn-outline"
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
            $<span className="font-bold text-accent">{course.price}</span> US
          </p>
        </div>
      </div>
    </li>
  );
};

export default Course;
