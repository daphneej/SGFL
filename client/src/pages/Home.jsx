import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import useCourse from "../hooks/useCourse";
import useCategory from "../hooks/useCategory";

import { actions } from "../context/actions/appActions";
import { useAppContext } from "../context/AppContext";

import Courses from "../components/courses/Courses";

const Home = () => {
  const { SET_SELECTED_COURSES_CATEGORY } = actions;
  const { isLoading, getCourses } = useCourse();
  const { getCategories } = useCategory();
  const { courses, categories, selectedCoursesCategory, dispatch } =
    useAppContext();
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    (async () => {
      await getCourses();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getCategories();
    })();
  }, []);

  useEffect(() => {
    const courseList =
      selectedCoursesCategory.id === 0
        ? courses
        : courses.filter(
            (course) => course.categoryId === selectedCoursesCategory.id
          );

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
    <div className="flex-1 flex flex-col w-full p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mx-12 my-2">
        <h1 className="font-bold text-2xl text-left">Cours</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 w-96">
          <select
            onChange={(e) => {
              const { value } = e.target;

              dispatch({
                type: SET_SELECTED_COURSES_CATEGORY,
                payload: [...categories, { id: 0, name: "Tous" }].find(
                  (category) => category.name === value
                ),
              });
            }}
            className="input input-bordered input-sm w-56 md:w-fit text-center"
            defaultValue={"Tous"}
            disabled={courses.length === 0}
          >
            <option value={"Tous"}>Tous</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            type="search"
            className="input input-bordered input-sm w-56"
            placeholder="Rechercher un cours"
            disabled={courses.length === 0}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center w-full mx-auto my-4">
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
