const ViewUserProfile = ({ inputs }) => {
  return (
    <div className="mt-6">
      {inputs.gender && (
        <div className="flex justify-between gap-1 mb-6">
          <label className="block font-semibold">Gender:</label>
          <p className="text-gray-500">{inputs.gender}</p>
        </div>
      )}
      {inputs.firstName && (
        <div className="flex justify-between gap-1 mb-6">
          <label className="block font-semibold">First Name:</label>
          <p className="text-gray-500">{inputs.firstName}</p>
        </div>
      )}
      {inputs.lastName && (
        <div className="flex justify-between gap-1 mb-6">
          <label className="block font-semibold">Last Name:</label>
          <p className="text-gray-500">{inputs.lastName}</p>
        </div>
      )}
      {inputs.address && (
        <div className="flex justify-between gap-1 mb-6">
          <label className="block font-semibold">Address:</label>
          <p className="text-gray-500">{inputs.address}</p>
        </div>
      )}
      {inputs.phone && (
        <div className="flex justify-between gap-1 mb-6">
          <label className="block font-semibold">Phone Number:</label>
          <p className="text-gray-500">{inputs.phone}</p>
        </div>
      )}
    </div>
  );
};

export default ViewUserProfile;
