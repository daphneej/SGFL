import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import ButtonForm from "@/components/forms/ButtonForm";
import SimpleForm from "@/components/forms/SimpleForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";

const GENDERS = ["MALE", "FEMALE"];

const UserProfileUpdate = ({
  register,
  handler,
  errors,
  isLoading,
  setIsEditing,
}) => {
  return (
    <SimpleForm handler={handler}>
      <InputsForm col={3}>
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
      </InputsForm>
      <ButtonsForm>
        <ButtonForm
          isLoading={isLoading}
          primary={true}
          label={"Sauvegarder"}
          handleClick={() => {}}
        />
        <ButtonForm
          isLoading={false}
          primary={false}
          label={"Annuler"}
          handleClick={() => setIsEditing(false)}
        />
      </ButtonsForm>
    </SimpleForm>
  );
};

export default UserProfileUpdate;
