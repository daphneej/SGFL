const ViewModal = ({ children, modalOpen }) => {
  return (
    <div
      className={`${
        modalOpen && "modal-open"
      } flex overflow-y-auto justify-center px-4 py-24 bg-base-300 modal`}
    >
      <div className="flex flex-col w-full md:w-[45rem] gap-4 p-8 rounded-md h-fit bg-base-300 shadow-md shadow-primary">
        {children}
      </div>
    </div>
  );
};

export default ViewModal;
