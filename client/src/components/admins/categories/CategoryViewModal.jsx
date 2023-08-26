import CategoryView from "@/components/admins/categories/CategoryView";
import ViewModal from "@/components/ViewModal";
import ViewHeader from "@/components/ViewHeader";

const ViewCategoryModal = ({
  selectedCategory: category,
  modalOpen,
  setModalOpen,
}) => {
  const handleSkipClick = () => {
    setModalOpen(false);
  };

  return (
    <ViewModal modalOpen={modalOpen}>
      <ViewHeader
        label="Informations De La Catégorie"
        handleSkipClick={handleSkipClick}
      />
      <CategoryView category={category} />
    </ViewModal>
  );
};
export default ViewCategoryModal;
