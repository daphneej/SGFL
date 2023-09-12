import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { queryClient } from "@/index";

import useUser from "@/hooks/users/useUser";
import useUserStore from "@/zustand/useUserStore";
import { addUserSchema } from "@/schemas/userSchema";

import InputText from "@/components/forms/InputText";
import SelectField from "@/components/forms/SelectField";
import ButtonForm from "@/components/forms/ButtonForm";
import ModalForm from "@/components/forms/ModalForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";
import { useEffect } from "react";

const GENDERS = ["MALE", "FEMALE"];
const STATUS = ["ACTIVE", "INACTIVE"];
const ROLES = ["ADMIN", "TRAINER", "STUDENT", "USER"];

const UserAddFormModal = ({ modalOpen, setModalOpen, userRole }) => {
  const { user } = useUserStore();
  const { addUser } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addUserSchema),
    values: {
      role: userRole && userRole,
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("users");
      reset();
      setModalOpen(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleAddUser = (data) => {
    mutate({ user: data, token: user.token });
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  return (
    <ModalForm
      handler={handleSubmit(handleAddUser)}
      modalOpen={modalOpen}
      label={"Ajouter Un Nouvel Utilisateur"}
    >
      <InputsForm col={2}>
        <InputText
          id={crypto.randomUUID()}
          name={"firstName"}
          label={"Prénom"}
          error={errors?.firstName}
          register={register("firstName")}
          type={"text"}
        />

        <InputText
          id={crypto.randomUUID()}
          name={"lastName"}
          label={"Nom De Famille"}
          error={errors?.lastName}
          register={register("lastName")}
          type={"text"}
        />

        <InputText
          id={crypto.randomUUID()}
          name={"email"}
          label={"Adresse Email"}
          error={errors?.email}
          register={register("email")}
          type={"email"}
        />

        <InputText
          id={crypto.randomUUID()}
          name={"address"}
          label={"Adresse"}
          error={errors?.address}
          register={register("address")}
          type={"text"}
        />

        <InputText
          id={crypto.randomUUID()}
          name={"phone"}
          label={"Numéro De Téléphone"}
          error={errors?.phone}
          register={register("phone")}
          type={"tel"}
        />

        <SelectField
          id={crypto.randomUUID()}
          label={"Sexe"}
          errors={errors}
          register={register}
          field={"gender"}
          optionLabel={"Sélectionner Le Sexe"}
          options={GENDERS.map((gender) => ({ key: gender, value: gender }))}
        />

        <InputText
          id={crypto.randomUUID()}
          name={"password"}
          label={"Mot De Passe"}
          error={errors?.password}
          register={register("password")}
          type={"password"}
        />

        {!userRole && (
          <SelectField
            id={crypto.randomUUID()}
            label={"Rôle"}
            errors={errors}
            register={register}
            field={"role"}
            optionLabel={"Sélectionner Le Rôle"}
            options={ROLES.map((role) => ({ key: role, value: role }))}
          />
        )}

        <SelectField
          id={crypto.randomUUID()}
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
          label={"Ajouter l'Utilisateur"}
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

export default UserAddFormModal;
