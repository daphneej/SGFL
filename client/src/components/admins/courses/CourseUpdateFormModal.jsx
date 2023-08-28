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

import InputField from "@/components/forms/InputField";
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
    queryFn: () => getCategories(user.token),
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
        published: Boolean(data?.published),
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
        <InputField
          uuid={crypto.randomUUID()}
          label={"Titre"}
          errors={errors}
          register={register}
          field={"title"}
          type={"text"}
        />

        <InputField
          uuid={crypto.randomUUID()}
          label={"Description"}
          errors={errors}
          register={register}
          field={"description"}
          type={"text"}
        />

        <SelectField
          uuid={crypto.randomUUID()}
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

        <InputField
          uuid={crypto.randomUUID()}
          label={"Prix"}
          errors={errors}
          register={register}
          field={"price"}
          type={"number"}
        />

        <SelectField
          uuid={crypto.randomUUID()}
          label={"Formateur"}
          errors={errors}
          register={register}
          field={"trainerId"}
          optionLabel={"Sélectionner Le Formateur"}
          options={users
            ?.filter((user) => user.role === "TRAINER" || user.role === "ADMIN")
            .map((trainer) => ({
              key: trainer.id,
              value: `${trainer.firstName} ${trainer.lastName}`,
            }))}
          disabled={isLoadingUsers}
          type={"number"}
        />

        <SelectField
          uuid={crypto.randomUUID()}
          label={"Status"}
          errors={errors}
          register={register}
          field={"published"}
          optionLabel={"Sélectionner Le Status"}
          options={[
            { key: false, value: "En Attente" },
            { key: true, value: "Publié" },
          ]}
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
