import { useState } from "react";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";

import useCourse from "../hooks/useCourse";
import useCategory from "../hooks/useCategory";

import Courses from "../components/courses/Courses";
import { AxiosError } from "axios";

const Home = () => {
  const { getCourses } = useCourse();
  const { getCategories } = useCategory();

  const [selectedCategoryCourse, setSelectedCategoryCourse] = useState("Tous");
  const [searchCourseValue, setSearchCourseValue] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const { isLoading, data: courses } = useQuery("courses", getCourses, {
    onSuccess: (data) => {
      setFilteredCourses(data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const { data: categories } = useQuery("categories", getCategories);

  return (
    <div className="flex-1 flex flex-col w-full p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mx-12 my-2">
        <h1 className="font-bold text-2xl text-left">Cours</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 w-96">
          <select
            onChange={(e) => {
              const { value } = e.target;

              const courseList =
                searchCourseValue.trim().length === 0
                  ? courses
                  : courses?.filter((course) => {
                      return (
                        course.title
                          .toLowerCase()
                          .includes(searchCourseValue.trim().toLowerCase()) ||
                        course.description
                          .toLowerCase()
                          .includes(searchCourseValue.trim().toLowerCase())
                      );
                    });

              setFilteredCourses(
                value === "Tous"
                  ? courseList
                  : courseList.filter((course) => {
                      return course.category.name === value;
                    })
              );

              setSelectedCategoryCourse(value);
            }}
            className="input input-bordered input-sm w-56 md:w-fit text-center"
            defaultValue={"Tous"}
            disabled={courses?.length === 0}
          >
            <option value={"Tous"}>Tous</option>
            {categories?.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            onChange={(e) => {
              const { value } = e.target;

              const courseList =
                selectedCategoryCourse === "Tous"
                  ? courses
                  : courses?.filter((course) => {
                      return course.category.name === selectedCategoryCourse;
                    });

              setFilteredCourses(
                courseList.filter((course) => {
                  return (
                    course.title
                      .toLowerCase()
                      .includes(value.trim().toLowerCase()) ||
                    course.description
                      .toLowerCase()
                      .includes(value.trim().toLowerCase())
                  );
                })
              );

              setSearchCourseValue(value);
            }}
            type="search"
            className="input input-bordered input-sm w-56"
            placeholder="Rechercher un cours"
            disabled={courses?.length === 0}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center w-full mx-auto my-4">
        {isLoading ? (
          <BeatLoader />
        ) : (
          <div className="w-full h-fit">
            {filteredCourses?.length === 0 ? (
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
