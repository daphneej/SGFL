import Course from "@/components/courses/Course";

const Courses = ({ courses }) => {
  return (
    <section className="">
      <ul className="flex flex-wrap justify-center gap-8 py-8 text-center">
        {courses.map((course, index) => (
          <Course key={index} course={course} />
        ))}
      </ul>
    </section>
  );
};

export default Courses;
