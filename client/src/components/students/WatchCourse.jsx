import { AiOutlineClose } from "react-icons/ai";

import { formatDate } from "../../utils/index";

const WatchCourse = ({
  modalOpen,
  setModalOpen,
  setSelectedCourse,
  course,
}) => {
  return (
    <div
      className={`flex justify-center p-2 items-center flex-col modal ${
        modalOpen && "modal-open"
      } w-full`}
    >
      <div className="flex flex-col w-full md:w-1/2 mx-auto bg-base-100 md:px-8 md:pt-4 md:pb-8 rounded-md px-3 py-4">
        <AiOutlineClose
          className="cursor-pointer ml-auto mb-4 text-2xl"
          onClick={() => {
            setSelectedCourse(null);
            setModalOpen(false);
          }}
        />

        <video controls className="rounded-xl h-72 md:h-96 w-full object-cover">
          <source src={course?.videoUrl} type="video/mp4" />
        </video>

        <div className="mt-3">
          <p className="mt-2 text-xl font-bold">{course?.title}</p>
          <p className="text-sm text-gray-500">
            {course?.trainer?.firstName} {course?.trainer?.lastName} •{" "}
            {formatDate(course?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchCourse;
