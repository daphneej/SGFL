const GENDERS = ["MALE", "FEMALE"];

const UpdateUserProfile = ({
  inputs,
  handleUpdateUser,
  isLoading,
  handleCancelClick,
}) => {
  return (
    <form onSubmit={handleUpdateUser} className="mt-6 space-y-4">
      <div className="flex-col mb-4">
        <label htmlFor="firstName" className="block font-semibold">
          First Name:
        </label>
        <input
          id="firstName"
          value={inputs.firstName}
          onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}
          type="text"
          className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
        />
      </div>
      <div className="flex-col mb-4">
        <label htmlFor="lastName" className="block font-semibold">
          Last Name:
        </label>
        <input
          id="lastName"
          value={inputs.lastName}
          onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
          type="text"
          className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
        />
      </div>
      <div className="flex-col mb-4">
        <label htmlFor="gender" className="block font-semibold">
          Gender:
        </label>
        <select
          id="gender"
          value={inputs.gender}
          onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
          className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
        >
          <option disabled value="">
            Select Gender
          </option>
          {GENDERS.map((gender) => (
            <option key={gender} value={gender}>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-col mb-4">
        <label htmlFor="address" className="block font-semibold">
          Address:
        </label>
        <input
          id="address"
          value={inputs.address}
          onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
          type="text"
          className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
        />
      </div>
      <div className="flex-col mb-4">
        <label htmlFor="phone" className="block font-semibold">
          Phone Number:
        </label>
        <input
          id="phone"
          value={inputs.phone}
          onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
          type="tel"
          className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <button
          type="submit"
          className={`flex-1 px-4 py-2 rounded-lg ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-gray-400 hover:text-black hover:bg-primary text-white hover:bg-gray-400 hover:text-black-focus"
          } text-white font-semibold`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            <span>Save Changes</span>
          )}
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          className="flex-1 px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateUserProfile;
