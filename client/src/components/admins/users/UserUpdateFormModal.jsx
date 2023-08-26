import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { queryClient } from "@/index";

import useUser from "@/hooks/users/useUser";
import useUserStore from "@/zustand/useUserStore";
import { updateUserSchema } from "@/schemas/userSchema";

import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import ButtonForm from "@/components/forms/ButtonForm";
import ModalForm from "@/components/forms/ModalForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";

const GENDERS = ["MALE", "FEMALE"];
const STATUS = ["ACTIVE", "INACTIVE"];
const ROLES = ["ADMIN", "TRAINER", "STUDENT", "USER"];

const UserUpdateFormModal = ({ selectedUser, modalOpen, setModalOpen }) => {
  const { user } = useUserStore();
  const { updateUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    values: {
      firstName: selectedUser?.firstName,
      lastName: selectedUser?.lastName,
      email: selectedUser?.email,
      address: selectedUser?.address,
      phone: selectedUser?.phone,
      gender: selectedUser?.gender,
      role: selectedUser?.role,
      status: selectedUser?.status,
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("users");
      setModalOpen(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleUpdateUser = (data) => {
    mutate({ user: { ...data, id: selectedUser.id }, token: user.token });
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  return (
    <ModalForm
      handler={handleSubmit(handleUpdateUser)}
      modalOpen={modalOpen}
      label={"Mettre à Jour le Nouvel Utilisateur"}
    >
      <InputsForm col={2}>
        <InputField
          uuid={crypto.randomUUID()}
          label={"Prénom"}
          errors={errors}
          register={register}
          field={"firstName"}
          type={"text"}
        />

        <InputField
          uuid={crypto.randomUUID()}
          label={"Nom De Famille"}
          errors={errors}
          register={register}
          field={"lastName"}
          type={"text"}
        />

        <InputField
          uuid={crypto.randomUUID()}
          label={"Adresse Email"}
          errors={errors}
          register={register}
          field={"email"}
          type={"email"}
        />

        <InputField
          uuid={crypto.randomUUID()}
          label={"Adresse"}
          errors={errors}
          register={register}
          field={"address"}
          type={"text"}
        />

        <InputField
          uuid={crypto.randomUUID()}
          label={"Numéro De Téléphone"}
          errors={errors}
          register={register}
          field={"phone"}
          type={"tel"}
        />

        <SelectField
          uuid={crypto.randomUUID()}
          label={"Sexe"}
          errors={errors}
          register={register}
          field={"gender"}
          optionLabel={"Sélectionner Le Sexe"}
          options={GENDERS.map((gender) => ({ key: gender, value: gender }))}
        />

        <SelectField
          uuid={crypto.randomUUID()}
          label={"Rôle"}
          errors={errors}
          register={register}
          field={"role"}
          optionLabel={"Sélectionner Le Rôle"}
          options={ROLES.map((role) => ({ key: role, value: role }))}
        />

        <SelectField
          uuid={crypto.randomUUID()}
          label={"Statut"}
          errors={errors}
          register={register}
          field={"status"}
          optionLabel={"Sélectionner Le Statut"}
          options={STATUS.map((status) => ({ key: status, value: status }))}
        />
      </InputsForm>
      <ButtonsForm>
        <ButtonForm
          isLoading={isLoading}
          primary={true}
          label={"Sauvegarder l'Utilisateur"}
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

export default UserUpdateFormModal;
