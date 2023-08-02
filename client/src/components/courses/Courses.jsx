import Course from "./Course";

const Courses = ({ courses }) => {
  return (
    <ul className="w-full md:w-[95%] mx-auto flex flex-wrap justify-center rounded-xl md:py-16 gap-4 md:gap-16 md:bg-neutral">
      {courses.map((course, index) => (
        <Course key={index} course={course} />
      ))}
    </ul>
  );
};

export default Courses;
