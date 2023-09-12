import InputText from "@/components/forms/InputText";
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
    <SimpleForm handler={handler} label={"Modifier Votre Profile"}>
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
          label={"Sexe"}
          errors={errors}
          register={register}
          field={"gender"}
          optionLabel={"Sélectionner Le Sexe"}
          options={GENDERS.map((gender) => ({ key: gender, value: gender }))}
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
