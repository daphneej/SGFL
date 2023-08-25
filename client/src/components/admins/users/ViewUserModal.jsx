import ViewUserProfile from "@/components/users/ViewUserProfile";

const ViewUserModal = ({ selectedUser: user, modalOpen, setModalOpen }) => {
  const handleSkipClick = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={`${
        modalOpen && "modal-open"
      } flex justify-center px-4 py-24 bg-base-300 modal`}
    >
      <div className="flex flex-col w-full md:w-[45rem] gap-4 p-8 rounded-md h-fit bg-base-300 shadow-md shadow-primary">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Profile</h2>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleSkipClick}
              className="flex-1 px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Skip
            </button>
          </div>
        </div>

        <div className="flex-1 mt-6">
          <div className="flex flex-col items-start gap-2 md:gap-4 md:flex-row md:items-center">
            <div className="avatar placeholder">
              <div className="rounded-full w-14 bg-neutral-focus text-neutral-content">
                <span>{user?.email[0].toUpperCase()}</span>
              </div>
            </div>
            <div className="flex flex-col justify-start">
              <h3 className="text-lg font-semibold text-left">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <ViewUserProfile user={user} />
        </div>
      </div>
    </div>
  );
};
export default ViewUserModal;
