const SimpleForm = ({ handler, label, children }) => {
  return (
    <form
      onSubmit={handler}
      className="p-8 rounded-md shadow-sm shadow-primary"
    >
      <h2 className="text-2xl font-bold">{label}</h2>
      {children}
    </form>
  );
};

export default SimpleForm;
