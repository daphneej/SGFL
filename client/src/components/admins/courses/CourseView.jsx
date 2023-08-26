import ViewBlock from "@/components/ViewBlock";

const CourseView = ({ course }) => {
  return (
    <div className="grid items-start grid-cols-1 gap-8 mt-10">
      {course?.title && <ViewBlock label="Titre" value={course?.title} />}
      {course?.description && (
        <ViewBlock label="Description" value={course?.description} />
      )}
      {course?.price && (
        <ViewBlock
          label="Prix"
          value={
            <>
              $<span className="text-primary">{course?.price}</span> US
            </>
          }
        />
      )}
      {(course?.trainer?.firstName || course?.trainer?.lastName) && (
        <ViewBlock
          label="Formateur"
          value={`${course?.trainer?.firstName} ${course?.trainer?.lastName}`}
        />
      )}
      {course?.category?.name && (
        <ViewBlock label="Catégorie" value={course?.category?.name} />
      )}
      {course?.students && (
        <ViewBlock label="Étudiants" value={course?.students?.length} />
      )}
      {(course?.published || course?.published === false) && (
        <ViewBlock
          label="Statut"
          value={
            course?.published ? (
              <span className="text-success">Publié</span>
            ) : (
              <span className="text-warning">Non publié</span>
            )
          }
        />
      )}
    </div>
  );
};

export default CourseView;
