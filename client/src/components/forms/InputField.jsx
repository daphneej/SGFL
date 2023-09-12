const InputField = ({
  uuid,
  label,
  field,
  register,
  type,
  errors,
  disabled,
  ...inputProps
}) => {
  return (
    <div className="flex-col">
      <label htmlFor={`${uuid}${field}`} className="block mb-2 font-semibold">
        {label}
      </label>

      <input
        type={type}
        id={`${uuid}${field}`}
        {...register(field, { valueAsNumber: type === "number" })}
        className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
        autoComplete={`${type === "password" && "current-password"}`}
        disabled={disabled}
        {...inputProps}
      />

      {errors[field] && (
        <p className="mt-1 text-xs text-red-500">{errors[field].message}</p>
      )}
    </div>
  );
};

export default InputField;
