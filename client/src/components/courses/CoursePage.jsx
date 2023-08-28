import { useState } from "react";
import { useQuery } from "react-query";

import useCourse from "@/hooks/useCourse";
import useCategory from "@/hooks/useCategory";

import useUserStore from "@/zustand/useUserStore";

import Courses from "@/components/courses/Courses";

const CoursePage = () => {
  const { getCourses } = useCourse();
  const { getCategories } = useCategory();
  const { user } = useUserStore();

  const [selectedCategoryCourse, setSelectedCategoryCourse] = useState("Tous");
  const [searchCourseValue, setSearchCourseValue] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const { isLoading, data: courses } = useQuery({
    queryKey: "courses",
    queryFn: getCourses,
    onSuccess: (data) => {
      setFilteredCourses(data);
    },
  });

  const { data: categories } = useQuery({
    queryKey: "categories",
    queryFn: () => getCategories(user.token),
  });

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full p-4">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center w-full gap-2 px-8 py-4 md:flex-row md:justify-between">
          <h2 className="text-2xl font-bold text-left">Cours</h2>
          <div className="flex flex-col items-center w-full gap-2 md:flex-row md:justify-between md:gap-4 md:w-fit">
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
              className="w-full text-center input input-bordered input-sm md:w-fit rounded-xl"
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
              className="w-full text-center input input-bordered input-sm md:w-56 rounded-xl md:text-left"
              placeholder="Rechercher un cours"
              disabled={courses?.length === 0}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-start flex-1 w-full mx-auto">
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            <div className="">
              {filteredCourses?.length === 0 ? (
                <p className="mx-auto my-8 text-xl font-bold text-center text-neutral-500">
                  Aucun cours trouvé
                </p>
              ) : (
                <Courses
                  courses={filteredCourses.filter((course) => course.published)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
