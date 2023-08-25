import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import ButtonForm from "@/components/forms/ButtonForm";
import SimpleForm from "@/components/forms/SimpleForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";

const GENDERS = ["MALE", "FEMALE"];
const STATUS = ["ACTIVE", "INACTIVE"];
const ROLES = ["ADMIN", "TRAINER", "STUDENT", "USER"];

const UpdateUserProfile = ({ register, handler, errors, isLoading }) => {
  return (
    <SimpleForm handler={handler}>
      <InputsForm col={2}>
        <InputField
          label={"Prénom"}
          errors={errors}
          register={register}
          field={"firstName"}
          type={"text"}
        />

        <InputField
          label={"Nom De Famille"}
          errors={errors}
          register={register}
          field={"lastName"}
          type={"text"}
        />

        <InputField
          label={"Adresse Email"}
          errors={errors}
          register={register}
          field={"email"}
          type={"email"}
        />

        <InputField
          label={"Adresse"}
          errors={errors}
          register={register}
          field={"address"}
          type={"text"}
        />

        <InputField
          label={"Numéro De Téléphone"}
          errors={errors}
          register={register}
          field={"phone"}
          type={"tel"}
        />

        <SelectField
          label={"Sexe"}
          errors={errors}
          register={register}
          field={"gender"}
          optionLabel={"Sélectionner Le Sexe"}
          options={GENDERS}
        />

        <SelectField
          label={"Rôle"}
          errors={errors}
          register={register}
          field={"role"}
          optionLabel={"Sélectionner Le Rôle"}
          options={ROLES}
        />

        <SelectField
          label={"Statut"}
          errors={errors}
          register={register}
          field={"status"}
          optionLabel={"Sélectionner Le Statut"}
          options={STATUS}
        />
      </InputsForm>
      <ButtonsForm>
        <ButtonForm
          isLoading={isLoading}
          primary={true}
          label={"Sauvegarder l'Utilisateur"}
          handleClick={() => {}}
        />
      </ButtonsForm>
    </SimpleForm>
  );
};

export default UpdateUserProfile;
