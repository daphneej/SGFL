const ModalForm = ({ label, handler, modalOpen, children }) => {
  return (
    <form
      className={`grid overflow-y-auto p-4 grid-col modal ${
        modalOpen && "modal-open"
      }`}
      onSubmit={handler}
    >
      <div className="flex flex-col w-full gap-4 p-8 text-left rounded-md shadow-md md:w-3/4 h-fit bg-base-300 shadow-primary">
        <h2 className="text-2xl font-bold">{label}</h2>
        {children}
      </div>
    </form>
  );
};

export default ModalForm;
