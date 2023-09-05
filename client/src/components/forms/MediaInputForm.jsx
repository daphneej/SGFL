const MediaInputForm = ({
  register,
  field,
  id,
  label,
  errors,
  ...inputProps
}) => {
  return (
    <div className="flex-col">
      <label htmlFor={id} className="block mb-2 font-semibold">
        {label}
      </label>

      <input
        id={id}
        className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
        {...register(field)}
        {...inputProps}
      />

      {errors[field]?.at(0) && (
        <p className="mt-1 text-xs text-red-500">
          {errors[field]?.at(0)?.message}
        </p>
      )}

      {errors[field]?.at(0)?.type && (
        <p className="mt-1 text-xs text-red-500">
          {errors[field]?.at(0)?.type?.message}
        </p>
      )}
    </div>
  );
};

export default MediaInputForm;
