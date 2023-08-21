import { useState } from "react";
import { useQuery } from "react-query";

import useCourse from "../hooks/useCourse";
import useCategory from "../hooks/useCategory";

import Courses from "../components/courses/Courses";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const CoursePage = () => {
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
    <div className="flex-1 flex flex-col justify-center items-center w-full p-4">
      <div className="container mx-auto">
        <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 py-4 px-8">
          <h2 className="font-bold text-2xl text-left">Cours</h2>
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-4 w-full md:w-fit">
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
              className="input input-bordered input-sm w-full md:w-fit text-center rounded-xl"
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
              className="input input-bordered input-sm w-full md:w-56 rounded-xl text-center md:text-left"
              placeholder="Rechercher un cours"
              disabled={courses?.length === 0}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-start items-center w-full mx-auto">
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            <div className="">
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
    </div>
  );
};

export default CoursePage;
