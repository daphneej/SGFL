import video from "../assets/lesson.mp4";

const Course = ({ course }) => {
  return (
    <li className="card w-full md:w-96 shadow-2xl rounded-2xl">
      <video className="w-full h-full rounded-t-2xl" controls>
        <source src={video} type="video/mp4" />
      </video>
      <div className="card-body bg-base-300 text-cente rounded-b-2xl">
        <p className="font-semibold text-2xl">{course.title}</p>
        <p className="text-neutral-500">{course.description}</p>
        <p className="font-bold italic">
          {course.trainer.firstName} {course.trainer.lastName}
        </p>
        <div className="card-actions flex-col-reverse md:flex-row  items-center justify-between mt-3">
          <button className="btn btn-primary w-full md:w-fit">
            Ajouter au panier
          </button>
          <p className="text-right">
            $<span className="font-bold">{course.price}</span> US
          </p>
        </div>
      </div>
    </li>
  );
};

export default Course;
