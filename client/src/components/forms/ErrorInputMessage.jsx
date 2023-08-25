const ErrorInputMessage = ({ errors, field }) => {
  return (
    errors[field] && (
      <p className="mt-1 text-xs text-red-500">{errors[field].message}</p>
    )
  );
};

export default ErrorInputMessage;
