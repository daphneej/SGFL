const ViewUserProfile = ({ user }) => {
  return (
    <div className="grid grid-cols-1 gap-1 mt-10 sm:grid-cols-1">
      {user?.gender && (
        <div className="flex justify-between gap-1 mb-6">
          <label className="block font-semibold">Sexe</label>
          <p className="text-right text-gray-500">{user?.gender}</p>
        </div>
      )}
      {user?.firstName && (
        <div className="flex justify-between gap-1 mb-6">
          <label className="block font-semibold">First Name:</label>
          <p className="text-right text-gray-500">{user?.firstName}</p>
        </div>
      )}
      {user?.lastName && (
        <div className="flex justify-between gap-1 mb-6">
          <label className="block font-semibold">Last Name:</label>
          <p className="text-right text-gray-500">{user?.lastName}</p>
        </div>
      )}
      {user?.address && (
        <div className="flex justify-between gap-1 mb-6">
          <label className="block font-semibold">Address:</label>
          <p className="text-right text-gray-500">{user?.address}</p>
        </div>
      )}
      {user?.phone && (
        <div className="flex justify-between gap-1 mb-6">
          <label className="block font-semibold">Phone Number:</label>
          <p className="text-right text-gray-500">{user?.phone}</p>
        </div>
      )}
    </div>
  );
};

export default ViewUserProfile;
