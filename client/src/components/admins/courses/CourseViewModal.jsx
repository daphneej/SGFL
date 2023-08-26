import CourseView from "@/components/admins/courses/CourseView";
import ViewHeader from "../../ViewHeader";
import ViewModal from "../../ViewModal";

const CourseViewModal = ({
  selectedCourse: course,
  modalOpen,
  setModalOpen,
}) => {
  const handleSkipClick = () => {
    setModalOpen(false);
  };

  return (
    <ViewModal modalOpen={modalOpen}>
      <ViewHeader
        label="Informations Du Cours"
        handleSkipClick={handleSkipClick}
      />
      <CourseView course={course} />
    </ViewModal>
  );
};

export default CourseViewModal;
