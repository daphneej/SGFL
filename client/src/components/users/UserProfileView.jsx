import ViewBlock from "@/components/ViewBlock";

const UserProfileView = ({ user }) => {
  return (
    <div className="grid items-start grid-cols-1 gap-8 mt-10">
      {user?.gender && <ViewBlock label="Genre" value={user?.gender} />}
      {user?.firstName && <ViewBlock label="Prénom" value={user?.firstName} />}
      {user?.lastName && <ViewBlock label="Nom" value={user?.lastName} />}
      {user?.address && <ViewBlock label="Adresse" value={user?.address} />}
      {user?.phone && <ViewBlock label="Téléphone" value={user?.phone} />}
    </div>
  );
};

export default UserProfileView;
