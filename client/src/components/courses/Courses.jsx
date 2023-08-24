import Course from "@/components/courses/Course";

const Courses = ({ courses }) => {
  return (
    <section className="">
      <div className="flex flex-wrap justify-center gap-8 py-8 text-center">
        {courses.map((course, index) => (
          <Course key={index} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Courses;
