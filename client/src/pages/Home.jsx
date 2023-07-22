import { useEffect, useState } from "react";
import useCourse from "../hooks/useCourse";
import { BeatLoader } from "react-spinners";

import { actions } from "../context/actions/appActions";
import { useAppContext } from "../context/AppContext";

import Courses from "../components/courses/Courses";

const Home = () => {
  const { SET_SELECTED_COURSES_CATEGORY } = actions;
  const { isLoading, getCourses } = useCourse();
  const { courses, selectedCoursesCategory, dispatch } = useAppContext();
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    (async () => {
      await getCourses();
    })();
  }, []);

  useEffect(() => {
    let courseList = [];

    switch (selectedCoursesCategory) {
      case "Électricité":
        courseList = courses.filter((course) => course.id <= 6);
        break;

      case "Climatisation":
        courseList = courses.filter((course) => course.id <= 12);
        break;

      case "Autotronique":
        courseList = courses.filter((course) => course.id <= 18);
        break;

      default:
        courseList = courses.filter((course) => course.id <= 27);
        break;
    }

    setFilteredCourses(
      courseList.filter(
        (course) =>
          course.title
            .toLocaleLowerCase()
            .includes(searchString.toLocaleLowerCase()) ||
          course.description
            .toLocaleLowerCase()
            .includes(searchString.toLocaleLowerCase())
      )
    );
  }, [courses, selectedCoursesCategory, searchString]);

  return (
    <div className="w-screen min-h-[36rem] md:h-screen flex flex-col p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mx-12 my-2">
        <h1 className="font-bold text-2xl text-left">Cours</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 w-96">
          <select
            onChange={(e) =>
              dispatch({
                type: SET_SELECTED_COURSES_CATEGORY,
                payload: e.target.value,
              })
            }
            className="input input-bordered input-sm w-56 md:w-fit text-center"
            defaultValue={"all"}
          >
            <option value={"all"}>Tous</option>
            <option value={"Électricité"}>Électricité</option>
            <option value={"Climatisation"}>Climatisation</option>
            <option value={"Autotronique"}>Autotronique</option>
          </select>
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
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
            {filteredCourses.length === 0 ? (
              <p className="my-4 mx-auto font-bold text-3xl text-neutral-500 text-center">
                Aucun cours trouvé
              </p>
            ) : (
              <Courses courses={filteredCourses} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
