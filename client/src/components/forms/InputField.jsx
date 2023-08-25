import ErrorInputMessage from "@/components/forms/ErrorInputMessage";

const InputField = ({
  uuid,
  label,
  field,
  register,
  type,
  errors,
  disabled,
}) => {
  return (
    <div className="flex-col mb-4">
      <label htmlFor={`${uuid}${field}`} className="block mb-2 font-semibold">
        {label}
      </label>
      <input
        id={`${uuid}${field}`}
        type={type}
        {...register(field)}
        className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
        autoComplete={`${type === "password" && "current-password"}`}
        disabled={disabled}
      />
      <ErrorInputMessage errors={errors} field={field} />
    </div>
  );
};

export default InputField;
