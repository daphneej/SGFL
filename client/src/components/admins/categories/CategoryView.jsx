import ViewBlock from "@/components/ViewBlock";

const CategoryView = ({ category }) => {
  return (
    <div className="grid items-start grid-cols-1 gap-8 mt-10">
      {category?.name && <ViewBlock label="Nom" value={category?.name} />}
      {category?.courses && (
        <ViewBlock label="Cours" value={category?.coursesLength} />
      )}
    </div>
  );
};

export default CategoryView;
