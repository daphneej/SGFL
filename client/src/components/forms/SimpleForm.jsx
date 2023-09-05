const SimpleForm = ({ handler, label, children }) => {
  return (
    <form
      encType="multipart/form-data"
      onSubmit={handler}
      className="w-full p-8 rounded-md shadow-sm shadow-primary"
    >
      <h2 className="text-2xl font-bold">{label}</h2>
      {children}
    </form>
  );
};

export default SimpleForm;
