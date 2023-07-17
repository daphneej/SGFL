import Course from "./Course";

const Courses = ({ courses }) => {
  return (
    <ul className="w-full h-full md:h-[36.8rem] mx-auto flex flex-wrap justify-evenly py-2 gap-8 overflow-y-auto">
      {courses.map((course, index) => (
        <Course key={index} course={course} />
      ))}
    </ul>
  );
};

export default Courses;
