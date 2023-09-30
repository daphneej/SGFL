import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { queryClient } from "@/index";

import useCategory from "@/hooks/useCategory";
import useUserStore from "@/zustand/useUserStore";
import { updateCategorySchema } from "@/schemas/categorySchema";

import InputText from "@/components/forms/InputText";
import ButtonForm from "@/components/forms/ButtonForm";
import ModalForm from "@/components/forms/ModalForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";

const CategoryUpdateFormModal = ({
  selectedCategory,
  modalOpen,
  setModalOpen,
}) => {
  const { user } = useUserStore();
  const { updateCategory } = useCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateCategorySchema),
    values: {
      name: selectedCategory?.name,
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationKey: ["categories"],
    mutationFn: updateCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("categories");
      reset();
      setModalOpen(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleUpdateCategory = (data) => {
    mutate({
      category: { ...data, id: selectedCategory.id },
      token: user.token,
    });
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  return (
    <ModalForm
      handler={handleSubmit(handleUpdateCategory)}
      modalOpen={modalOpen}
      label={"Mettre À Jour La Catégorie"}
    >
      <InputsForm col={1}>
        <InputText
          id={crypto.randomUUID()}
          name={"name"}
          label={"Nom De La Catégorie"}
          error={errors?.name}
          register={register("name")}
          type={"text"}
        />
      </InputsForm>
      <ButtonsForm>
        <ButtonForm
          isLoading={isLoading}
          primary={true}
          label={"Sauvegarder La Catégorie"}
          handleClick={() => {}}
        />
        <ButtonForm
          isLoading={isLoading}
          primary={false}
          label={"Annuler"}
          handleClick={handleCancelClick}
        />
      </ButtonsForm>
    </ModalForm>
  );
};

export default CategoryUpdateFormModal;
