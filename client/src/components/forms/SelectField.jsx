import ErrorInputMessage from "@/components/forms/ErrorInputMessage";

const SelectField = ({
  uuid,
  label,
  field,
  register,
  optionLabel,
  errors,
  options,
  disabled,
}) => {
  return (
    <div className="flex-col mb-4">
      <label htmlFor={`${uuid}${field}`} className="block mb-2 font-semibold">
        {label}
      </label>
      <select
        id={`${uuid}${field}`}
        {...register(field)}
        className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
        defaultValue={""}
        disabled={disabled}
      >
        <option disabled value="">
          {optionLabel}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ErrorInputMessage errors={errors} field={field} />
    </div>
  );
};

export default SelectField;
