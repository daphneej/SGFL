import Course from "./Course";

const Courses = ({ courses }) => {
  return (
    <ul className="w-full mx-auto flex flex-wrap justify-evenly py-4 gap-8">
      {courses.map((course, index) => (
        <Course key={index} course={course} />
      ))}
    </ul>
  );
};

export default Courses;
