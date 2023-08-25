const InputsForm = ({ children, col }) => {
  return (
    <div className={`grid grid-cols-1 gap-8 mt-10 sm:grid-cols-${col}`}>
      {children}
    </div>
  );
};

export default InputsForm;
