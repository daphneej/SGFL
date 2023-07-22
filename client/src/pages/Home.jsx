import { useEffect } from "react";
import useCourse from "../hooks/useCourse";
import { BeatLoader } from "react-spinners";

import { useAppContext } from "../context/AppContext";

import Courses from "../components/courses/Courses";

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
              <Courses courses={courses} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
