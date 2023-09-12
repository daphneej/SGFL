const InputText = ({ id, label, register, error, ...inputProps }) => {
  return (
    <div className="flex-col">
      <label htmlFor={id} className="block mb-2 font-semibold">
        {label}
      </label>

      <input
        id={id}
        {...register}
        {...inputProps}
        className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
      />

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputText;
