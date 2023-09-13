import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { queryClient } from "@/index";

import useUser from "@/hooks/users/useUser";
import useCourse from "@/hooks/useCourse";
import useCategory from "@/hooks/useCategory";
import useUserStore from "@/zustand/useUserStore";

import { updateCourseSchema } from "@/schemas/courseSchema";

import InputText from "@/components/forms/InputText";
import SelectField from "@/components/forms/SelectField";
import ButtonForm from "@/components/forms/ButtonForm";
import ModalForm from "@/components/forms/ModalForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";

const CourseUpdateFormModal = ({ selectedCourse, modalOpen, setModalOpen }) => {
  const { user } = useUserStore();
  const { updateCourse } = useCourse();
  const { getUsers } = useUser();
  const { getCategories } = useCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateCourseSchema),
    values: {
      title: selectedCourse?.title,
      description: selectedCourse?.description,
      categoryId: selectedCourse?.categoryId,
      price: selectedCourse?.price,
      trainerId: selectedCourse?.trainerId,
      published: selectedCourse?.published,
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: updateCourse,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("courses");
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

  const handleUpdateCourse = (data) => {
    mutate({
      course: {
        ...data,
        id: selectedCourse.id,
      },
      token: user.token,
    });
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  return (
    <ModalForm
      handler={handleSubmit(handleUpdateCourse)}
      modalOpen={modalOpen}
      label={"Mettre A Jour Le Cours"}
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
          step={"0.01"}
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
          options={[
            { key: "PENDING", value: "En Attente" },
            { key: "PUBLISHED", value: "Publié" },
          ]}
          type={"text"}
        />
      </InputsForm>
      <ButtonsForm>
        <ButtonForm
          isLoading={isLoading}
          primary={true}
          label={"Sauvegarder Le Cours"}
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

export default CourseUpdateFormModal;
