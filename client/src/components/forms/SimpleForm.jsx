const SimpleForm = ({ handler, label, children }) => {
  return (
    <form onSubmit={handler}>
      <h2 className="text-2xl font-bold">{label}</h2>
      {children}
    </form>
  );
};

export default SimpleForm;
