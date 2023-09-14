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

import InputText from "@/components/forms/InputText";
import MediaInputForm from "@/components/forms/MediaInputForm";
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
    queryFn: () => getCategories(),
    enabled: Boolean(user),
  });

  const handleAddCourse = async (data) => {
    mutate({
      course: { ...data, thumbnail: data?.thumbnail[0], video: data?.video[0] },
      token: user.token,
    });
  };

  return (
    <SimpleForm
      handler={handleSubmit(handleAddCourse)}
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

        <MediaInputForm
          id={crypto.randomUUID()}
          name={"thumbnail"}
          label={"Photo De Couverture"}
          field={"thumbnail"}
          type={"file"}
          accept="image/*"
          register={register("thumbnail")}
          disabled={isLoading}
          errors={errors}
        />

        <MediaInputForm
          id={crypto.randomUUID()}
          name={"video"}
          label={"Vidéo Du Cours"}
          field={"video"}
          type={"file"}
          accept="video/*"
          register={register("video")}
          disabled={isLoading}
          errors={errors}
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
