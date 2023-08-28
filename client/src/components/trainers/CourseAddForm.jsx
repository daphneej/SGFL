import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { queryClient } from "@/index";

import useUserStore from "@/zustand/useUserStore";
import useCategory from "@/hooks/useCategory";
import useCourse from "@/hooks/useCourse";
import { addCourseSchema } from "@/schemas/courseSchema";

import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import ButtonForm from "@/components/forms/ButtonForm";
import SimpleForm from "@/components/forms/SimpleForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";

const CourseAddForm = () => {
  const { user } = useUserStore();
  const { addCourse } = useCourse();
  const { getCategories } = useCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addCourseSchema),
    values: {
      trainerId: user?.id,
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationKey: ["courses"],
    mutationFn: addCourse,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("courses");
      reset();
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

  const handleAddCourse = (data) => {
    mutate({ course: data, token: user.token });
  };

  return (
    <SimpleForm
      handler={handleSubmit(handleAddCourse)}
      label={"Ajouter Un Nouveau Cours"}
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
      </InputsForm>
      <ButtonsForm>
        <ButtonForm
          isLoading={isLoading}
          primary={true}
          label={"Ajouter Le Cours"}
          handleClick={() => {}}
        />
      </ButtonsForm>
    </SimpleForm>
  );
};

export default CourseAddForm;
