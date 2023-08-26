import UserView from "@/components/admins/users/UserView";
import ViewModal from "@/components/ViewModal";
import ViewHeader from "@/components/ViewHeader";

const UserViewModal = ({ selectedUser: user, modalOpen, setModalOpen }) => {
  const handleSkipClick = () => {
    setModalOpen(false);
  };

  return (
    <ViewModal modalOpen={modalOpen}>
      <ViewHeader
        label="Informations d'Utilisateur"
        handleSkipClick={handleSkipClick}
      />

      <div className="flex-1 mt-6">
        <div className="flex flex-col items-center gap-2 p-4 rounded-md bg-base-200 md:items-start md:gap-4 md:flex-row">
          <div className="avatar placeholder">
            <div className="rounded-full w-14 bg-neutral-focus text-neutral-content">
              <span>{user?.email[0].toUpperCase()}</span>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-left">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <UserView user={user} />
    </ViewModal>
  );
};
export default UserViewModal;
