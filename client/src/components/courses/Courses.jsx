import Course from "./Course";

const Courses = ({ courses }) => {
  return (
    <section className="">
      <div className="flex flex-wrap justify-center gap-8 text-center py-8">
        {courses.map((course, index) => (
          <Course key={index} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Courses;
