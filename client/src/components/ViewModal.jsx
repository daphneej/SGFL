const ViewModal = ({ children, modalOpen, label }) => {
  return (
    <div
      className={`grid overflow-y-auto p-4 grid-col modal ${
        modalOpen && "modal-open"
      }`}
    >
      <div className="flex flex-col w-full gap-4 p-8 text-left rounded-md shadow-md md:w-2/4 h-fit bg-base-300 shadow-primary">
        {children}
      </div>
    </div>
  );
};

export default ViewModal;
