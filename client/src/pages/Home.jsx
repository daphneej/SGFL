import { useEffect } from "react";
import useCourse from "../hooks/useCourse";
import { BeatLoader } from "react-spinners";

import { useAppContext } from "../context/AppContext";

import video from "../assets/lesson.mp4";

const Home = () => {
  const { courses } = useAppContext();
  const { isLoading, getCourses } = useCourse();

  useEffect(() => {
    (async () => {
      await getCourses();
    })();
  }, []);

  return (
    <div className="w-screen min-h-[36rem] md:h-screen flex flex-col p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mx-12 my-2">
        <h1 className="font-bold text-2xl text-left">Cours</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 w-96">
          <select className="input input-bordered input-sm w-56 md:w-fit text-center">
            <option>Cartegorie</option>
            <option>Title</option>
            <option>Description</option>
            <option>Prix</option>
          </select>
          <input
            type="search"
            className="input input-bordered input-sm w-56"
            placeholder="Rechercher un cours"
          />
        </div>
      </div>

      <div className="mx-auto my-4">
        {isLoading ? (
          <BeatLoader />
        ) : (
          <div className="w-full h-fit">
            {courses.length === 0 ? (
              <p className="my-4 mx-auto font-bold text-3xl text-neutral-500 text-center">
                Aucun cours trouvé
              </p>
            ) : (
              <ul className="w-full h-full md:h-[36.8rem] mx-auto flex flex-wrap justify-evenly py-2 gap-8 overflow-y-auto">
                {courses.map((course, index) => (
                  <li
                    key={index}
                    className="card w-full md:w-96 shadow-2xl rounded-2xl"
                  >
                    <video className="w-full h-full rounded-t-2xl" controls>
                      <source src={video} type="video/mp4" />
                    </video>
                    <div className="card-body bg-base-300 text-cente rounded-b-2xl">
                      <p className="font-semibold text-2xl">{course.title}</p>
                      <p className="text-neutral-500">{course.description}</p>
                      <p className="font-bold italic">
                        {course.trainer.firstName} {course.trainer.lastName}
                      </p>
                      <div className="card-actions items-center justify-between mt-3">
                        <button className="btn btn-primary btn-sm">
                          Ajouter au panier
                        </button>
                        <p className="text-right">
                          $<span className="font-bold">{course.price}</span> US
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
