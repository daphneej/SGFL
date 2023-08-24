import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

import useUserStore from "@/zustand/useUserStore";
import useAuth from "@/hooks/users/useAuth";
import ViewUserProfile from "@/components/users/ViewUserProfile";
import UpdateUserProfile from "@/components/users/UpdateUserProfile";

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
    <div className="flex justify-center px-4 py-24 bg-base-100">
      <div className="w-full max-w-md p-8 rounded-md h-fit bg-base-300">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Profile</h2>
          {!isEditing && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleEditClick}
                className="flex-1 px-4 py-2 font-semibold text-white rounded-lg bg-primary hover:bg-neutral"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleSkipClick}
                className="flex-1 px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Skip
              </button>
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="flex flex-col items-start gap-2 md:gap-4 md:flex-row md:items-center">
            <div className="avatar placeholder">
              <div className="rounded-full w-14 bg-neutral-focus text-neutral-content">
                <span>{user.email[0].toUpperCase()}</span>
              </div>
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
            <UpdateUserProfile
              inputs={inputs}
              isLoading={isLoading}
              handleUpdateUser={handleUpdateUser}
              handleCancelClick={handleCancelClick}
            />
          ) : (
            <ViewUserProfile inputs={inputs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
