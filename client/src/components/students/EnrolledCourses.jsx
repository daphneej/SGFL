import useUserStore from "@/zustand/useUserStore";

const EnrolledCourses = () => {
  const { user } = useUserStore();

  return (
    <>
      <h2 className="mt-10 mb-4 text-2xl font-bold text-center md:text-right">
        Cours
      </h2>

      <div className="flex flex-col">
        {user?.enrolledCourses?.length === 0 ? (
          <div className="flex items-center justify-center w-full">
            <h2 className="text-xl font-bold text-center">
              No Courses Bought Yet
            </h2>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {user?.enrolledCourses?.map((course) => (
                <li
                  key={course?.id}
                  className="flex items-center justify-between px-6 py-4 transition duration-300 rounded-lg shadow-sm cursor-pointer bg-base-300 shadow-primary hover:shadow-lg"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{course?.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {course?.description}
                    </p>
                    <p className="mt-2 text-sm font-bold text-gray-600">
                      $<span className="text-blue-500">{course?.price}</span> US
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default EnrolledCourses;
