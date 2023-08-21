import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

import useUserStore from "../zustand/useUserStore";
import useAuth from "../hooks/useAuth";

const GENDERS = ["MALE", "FEMALE"];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    gender: user.gender || "",
    address: user.address || "",
    phone: user.phone || "",
  });

  const { isLoading, mutate } = useMutation(["user", user.id], updateUser, {
    onSuccess: (data) => {
      toast.success(data.message);
      setUser(data.user);
      setIsEditing(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setInputs({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user.gender || "",
      address: user.address || "",
      phone: user.phone || "",
    });
  };

  const handleSkipClick = () => {
    navigate("/");
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    mutate({ ...inputs, token: user.token });
  };

  return (
    <div className="flex justify-center py-14 min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md h-fit p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile
          </h2>
          {!isEditing && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleEditClick}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-gray-400"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleSkipClick}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400"
              >
                Skip
              </button>
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="flex flex-col gap-2 md:gap-4 items-start md:flex-row md:items-center">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl">
              <p className="font-bold">{user.email[0].toUpperCase()}</p>
            </div>
            <div>
              <div className="">
                <h3 className="text-lg font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdateUser} className="mt-6 space-y-4">
              <div className="mb-4 flex-col">
                <label
                  htmlFor="firstName"
                  className="block font-semibold text-gray-800 dark:text-gray-200"
                >
                  First Name:
                </label>
                <input
                  id="firstName"
                  value={inputs.firstName}
                  onChange={(e) =>
                    setInputs({ ...inputs, firstName: e.target.value })
                  }
                  type="text"
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-base-200"
                />
              </div>
              <div className="mb-4 flex-col">
                <label
                  htmlFor="lastName"
                  className="block font-semibold text-gray-800 dark:text-gray-200"
                >
                  Last Name:
                </label>
                <input
                  id="lastName"
                  value={inputs.lastName}
                  onChange={(e) =>
                    setInputs({ ...inputs, lastName: e.target.value })
                  }
                  type="text"
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-base-200"
                />
              </div>
              <div className="mb-4 flex-col">
                <label
                  htmlFor="gender"
                  className="block font-semibold text-gray-800 dark:text-gray-200"
                >
                  Gender:
                </label>
                <select
                  id="gender"
                  value={inputs.gender}
                  onChange={(e) =>
                    setInputs({ ...inputs, gender: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-base-200"
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
              <div className="mb-4 flex-col">
                <label
                  htmlFor="address"
                  className="block font-semibold text-gray-800 dark:text-gray-200"
                >
                  Address:
                </label>
                <input
                  id="address"
                  value={inputs.address}
                  onChange={(e) =>
                    setInputs({ ...inputs, address: e.target.value })
                  }
                  type="text"
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-base-200"
                />
              </div>
              <div className="mb-4 flex-col">
                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-800 dark:text-gray-200"
                >
                  Phone Number:
                </label>
                <input
                  id="phone"
                  value={inputs.phone}
                  onChange={(e) =>
                    setInputs({ ...inputs, phone: e.target.value })
                  }
                  type="tel"
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-base-200"
                />
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2 rounded-lg ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-focus"
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
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6">
              {inputs.gender && (
                <div className="mb-6 flex gap-1 justify-between">
                  <label className="block font-semibold text-gray-800 dark:text-gray-200">
                    Gender:
                  </label>
                  <p className="text-gray-500">{inputs.gender}</p>
                </div>
              )}
              {inputs.firstName && (
                <div className="mb-6 flex gap-1 justify-between">
                  <label className="block font-semibold text-gray-800 dark:text-gray-200">
                    First Name:
                  </label>
                  <p className="text-gray-500">{inputs.firstName}</p>
                </div>
              )}
              {inputs.lastName && (
                <div className="mb-6 flex gap-1 justify-between">
                  <label className="block font-semibold text-gray-800 dark:text-gray-200">
                    Last Name:
                  </label>
                  <p className="text-gray-500">{inputs.lastName}</p>
                </div>
              )}
              {inputs.address && (
                <div className="mb-6 flex gap-1 justify-between">
                  <label className="block font-semibold text-gray-800 dark:text-gray-200">
                    Address:
                  </label>
                  <p className="text-gray-500">{inputs.address}</p>
                </div>
              )}
              {inputs.phone && (
                <div className="mb-6 flex gap-1 justify-between">
                  <label className="block font-semibold text-gray-800 dark:text-gray-200">
                    Phone Number:
                  </label>
                  <p className="text-gray-500">{inputs.phone}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
