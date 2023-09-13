import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { queryClient } from "@/index";

import useUserStore from "@/zustand/useUserStore";
import useUser from "@/hooks/users/useUser";
import useCategory from "@/hooks/useCategory";
import useCourse from "@/hooks/useCourse";
import { addCourseSchema } from "@/schemas/courseSchema";

import InputText from "@/components/forms/InputText";
import SelectField from "@/components/forms/SelectField";
import ButtonForm from "@/components/forms/ButtonForm";
import ModalForm from "@/components/forms/ModalForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";

const CourseAddFormModal = ({ modalOpen, setModalOpen }) => {
  const { user } = useUserStore();
  const { addCourse } = useCourse();
  const { getUsers } = useUser();
  const { getCategories } = useCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addCourseSchema) });

  const { isLoading, mutate } = useMutation({
    mutationFn: addCourse,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("courses");
      reset();
      setModalOpen(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const { isLoading: isLoadingCategories, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    enabled: Boolean(user),
  });

  const { isLoading: isLoadingUsers, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(user.token),
    enabled: Boolean(user),
  });

  // TODO: This is not working
  const handleAddCourse = (data) => {
    // mutate({ course: data, token: user.token });
    console.log(data);
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  return (
    <ModalForm
      handler={handleSubmit(handleAddCourse)}
      modalOpen={modalOpen}
      label={"Ajouter Un Nouveau Cours"}
    >
      <InputsForm col={2}>
        <InputText
          id={crypto.randomUUID()}
          name={"title"}
          label={"Titre"}
          error={errors?.title}
          register={register("title")}
          type={"text"}
        />

        <InputText
          id={crypto.randomUUID()}
          name={"description"}
          label={"Description"}
          error={errors?.description}
          register={register("description")}
          type={"text"}
        />

        <SelectField
          id={crypto.randomUUID()}
          label={"Catégorie"}
          errors={errors}
          register={register}
          field={"categoryId"}
          optionLabel={"Sélectionner La Catégorie"}
          options={categories?.map((category) => ({
            key: category.id,
            value: category.name,
          }))}
          disabled={isLoadingCategories}
          type={"number"}
        />

        <InputText
          id={crypto.randomUUID()}
          name={"price"}
          label={"Prix"}
          error={errors?.price}
          register={register("price", { valueAsNumber: true })}
          type={"number"}
          step={0.01}
        />

        <SelectField
          id={crypto.randomUUID()}
          label={"Formateur"}
          errors={errors}
          register={register}
          field={"trainerId"}
          optionLabel={"Sélectionner Le Formateur"}
          options={users
            ?.filter((user) => user.role === "TRAINER" || user.role === "ADMIN")
            .map((trainer) => ({
              key: trainer.id,
              value: `${
                user.id === trainer.id
                  ? "Vous"
                  : `${trainer.firstName} ${trainer.lastName}`
              } (${trainer.role === "ADMIN" ? "Administrateur" : "Formateur"})`,
            }))}
          disabled={isLoadingUsers}
          type={"number"}
        />

        <SelectField
          id={crypto.randomUUID()}
          label={"Status"}
          errors={errors}
          register={register}
          field={"published"}
          optionLabel={"Sélectionner Le Status"}
          options={["PENDING", "PUBLISHED"].map((status) => ({
            key: status,
            value: status === "PUBLISHED" ? "Publié" : "En Attente",
          }))}
          disabled={isLoadingUsers}
          type={"text"}
        />
      </InputsForm>
      <ButtonsForm>
        <ButtonForm
          isLoading={isLoading}
          primary={true}
          label={"Ajouter Le Cours"}
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

export default CourseAddFormModal;
